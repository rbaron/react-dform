
export const validateSchema = (schemaText, keyExtractor, allowedKeys = null)  => {
  let schema;

  try {
    schema = JSON.parse(schemaText)
  } catch(e) {
    throw new Error(`Could not parse JSON: ${e}`)
  }

  const allowedKeysSet = allowedKeys ? new Set([...allowedKeys]) : null
  _traverseAndCheck(schema, keyExtractor, allowedKeysSet)

  return schema;
}

const _traverseAndCheck = (schema, keyExtractor, allowedKeysSet, seenKeys = new Set()) => {
  // Validate fields
  schema.fields.forEach(field => _validateField(field, keyExtractor))

  // Validate conds
  _validateConds(schema, seenKeys)

  const keys = schema.fields.map(keyExtractor)

  // Validate forbidden keys
  _validateKeys(keys, allowedKeysSet)

  const newSeenKeys = new Set([...seenKeys, ...keys])

  if (schema.children) {
    return schema.children.every(s => _traverseAndCheck(s, keyExtractor, allowedKeysSet, newSeenKeys))
  } else {
    return true
  }
}

const _validateField = (field, keyExtractor) => {
  if (!field.type) {
      throw new Error(`Field is missing type`)
  } else if (!keyExtractor(field)) {
      throw new Error(`Field is missing key`)
  }
}

const _validateConds = (schema, seenKeys) => {
  if (!schema.cond) {
    throw new Error(`Missing cond`)
  } else if (schema.cond.field_id && !seenKeys.has(schema.cond.field_id)) {
    throw new Error(`Input with key ${schema.cond.field_id} does not exist at this point`)
  } else if (schema.cond.conds) {
    schema.cond.conds.forEach(cond => {
      if (!seenKeys.has(cond.field_id)) {
        throw new Error(`Input with key ${cond.field_id} does not exist at this point`)
      }
    })
  }
}

const _validateKeys = (keys, allowedKeysSet) => {
  if (allowedKeysSet) {
    keys.forEach(k => {
      if (!allowedKeysSet.has(k)) {
        throw new Error(`Key ${k} is not allowed`)
      }
    })
  }
}
