
export const validateSchema = (schemaText, keyExtractor, allowedKeys = null)  => {
  let schema;

  try {
    schema = JSON.parse(schemaText)
  } catch(e) {
    throw new Error(`Could not parse JSON: ${e}`)
  }

  _lookForInvalidCond(schema, keyExtractor);
  _lookForForbiddenKeys(schema, keyExtractor, allowedKeys);

  return schema;
}

const _lookForInvalidCond = (schema, keyExtractor, seenKeys = new Set()) => {
  if (schema.cond.field_id && !seenKeys.has(schema.cond.field_id)) {
    throw new Error(`Input with key ${schema.cond.field_id} does not exist at this point`)
  } else if (schema.cond.conds) {
    schema.cond.conds.forEach(cond => {
      if (!seenKeys.has(cond.field_id)) {
        throw new Error(`Input with key ${cond.field_id} does not exist at this point`)
      }
    })
  }

  const newSeen = new Set([...seenKeys, ...schema.fields.map(keyExtractor)])

  if (schema.children) return schema.children.every(s => _lookForInvalidCond(s, keyExtractor, newSeen))
}

const _lookForForbiddenKeys = (schema, keyExtractor, allowedKeys) => {
  if (!allowedKeys) return;

  const allKeys = _collectKeys(schema, keyExtractor)

  allKeys.forEach(k => {
    if (!allowedKeys.has(k)) {
      throw new Error(`Key ${k} is not allowed`)
    }
  })
}

const _collectKeys = (schema, keyExtractor) => {
  const keys = new Set(schema.fields.map(keyExtractor));

  if (!schema.children) return keys
  return schema.children.reduce((acc, s) => new Set([...acc, ..._collectKeys(s, keyExtractor)]), keys)
}
