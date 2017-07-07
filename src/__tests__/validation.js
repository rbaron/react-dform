import { validateSchema } from '../validation'

describe('validateSchema with invalid JSON', () => {
  it('raises if invalid JSON', () => {
    const schemaText = "{"
    expect(() => validateSchema(schemaText)).toThrowErrorMatchingSnapshot()
  });
})

describe('validateSchema with inputs not define previously', () => {
  it('raises if a cond references a non-existing input in compound conds', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        id: 'input1',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'and',
          conds: [{
              type: 'truthy',
              field_id: 'input1',
          }, {
              type: 'truthy',
              // This input does not exist
              field_id: 'input2',
          }],
        },
        fields: [{
            type: 'boolean',
            id: 'input3',
            label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.id

    expect(() => validateSchema(schemaText, keyExtractor)).toThrowError(
      'Input with key input2 does not exist at this point')
  });

  it('raises if a cond references a non-existing input', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        id: 'input1',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'truthy',
          // This input does not exist at this point
          field_id: 'input3',
        },
        fields: [{
            type: 'boolean',
            id: 'input3',
            label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.id

    expect(() => validateSchema(schemaText, keyExtractor)).toThrowError(
      'Input with key input3 does not exist at this point')
  });

  it('works with keyExtractor for label', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        id: 'input1',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'truthy',
          field_id: 'input1label',
        },
        fields: [{
            type: 'boolean',
            id: 'input3',
            label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.label

    expect(validateSchema(schemaText, keyExtractor)).toBeTruthy();
  });

  it('works with keyExtractor for id', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        id: 'input1',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'truthy',
          field_id: 'input1',
        },
        fields: [{
            type: 'boolean',
            id: 'input3',
            label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.id

    expect(validateSchema(schemaText, keyExtractor)).toBeTruthy();
  });
});

describe('validateSchema with allowedKeys', () => {
  it('raises if a forbidden key is used', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        id: 'input1',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'and',
          conds: [{
              type: 'truthy',
              field_id: 'input1',
          }],
        },
        fields: [{
            type: 'boolean',
            id: 'input3',
            label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.id

    const allowedKeys = new Set(['input1'])

    expect(() => validateSchema(schemaText, keyExtractor, allowedKeys)).toThrowError(
      'Key input3 is not allowed')
  });

  it('raises if a forbidden key is used with keyExtractor for label', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'and',
          conds: [{
              type: 'truthy',
              field_id: 'input1label',
          }],
        },
        fields: [{
            type: 'boolean',
            label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.label

    const allowedKeys = new Set(['input1label'])

    expect(() => validateSchema(schemaText, keyExtractor, allowedKeys)).toThrowError(
      'Key input3label is not allowed')
  });

  it('works', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        id: 'input1',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'and',
          conds: [{
              type: 'truthy',
              field_id: 'input1',
          }],
        },
        fields: [{
            type: 'boolean',
            id: 'input3',
            label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.id

    const allowedKeys = new Set(['input1', 'input3'])

    expect(validateSchema(schemaText, keyExtractor, allowedKeys)).toBeTruthy();
  });

  it('works with keyExtractor for label', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'and',
          conds: [{
              type: 'truthy',
              field_id: 'input1label',
          }],
        },
        fields: [{
            type: 'boolean',
            label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.label

    const allowedKeys = new Set(['input1label', 'input3label'])

    expect(validateSchema(schemaText, keyExtractor, allowedKeys)).toBeTruthy();
  });
});

describe('validateSchema with invalid fields', () => {
  it('raises if a child field is missing type', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        id: 'input1',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'and',
          conds: [{
              type: 'truthy',
              field_id: 'input1',
          }],
        },
        fields: [{
            // Missing type
            //type: 'boolean',
            id: 'input3',
            label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.id

    expect(() => validateSchema(schemaText, keyExtractor, null)).toThrowError(
      'Field is missing type')
  });

  it('raises if a child field is missing key', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        label: 'input1label',
      }],
      children: [{
        cond: {
          type: 'and',
          conds: [{
              type: 'truthy',
              field_id: 'input1label',
          }],
        },
        fields: [{
            type: 'boolean',
            // Missing key
            //label: 'input3label',
        }],
      }],
    });

    const keyExtractor = item => item.label

    expect(() => validateSchema(schemaText, keyExtractor, null)).toThrowError(
      'Field is missing key')
  });

  it('raises if one schema field is missing key', () => {
    const schemaText = JSON.stringify({
      cond: {
        type: 'always_true',
      },
      fields: [{
        type: 'boolean',
        // Missing key
        //label: 'input1label',
      }],
    });

    const keyExtractor = item => item.label

    expect(() => validateSchema(schemaText, keyExtractor, null)).toThrowError(
      'Field is missing key')
  });
});

describe('validateSchema with invalid conds', () => {
  it.only('raises if missing cond', () => {
    const schemaText = JSON.stringify({
      // Missing cond
      //cond: {
      //  type: 'always_true',
      //},
      fields: [{
        type: 'boolean',
        id: 'input1',
        label: 'input1label',
      }],
    });

    const keyExtractor = item => item.id

    expect(() => validateSchema(schemaText, keyExtractor, null)).toThrowError(
      'Missing cond')
  });
});
