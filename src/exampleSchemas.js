
export const exampleSchema = {
    cond: {
      type: 'equals',
      field_id: 'showForm',
      field_value: true,
    },
    fields: [{
      type: 'boolean',
      id: 'input1',
      label: 'input1label',
    }, {
      type: 'string',
      id: 'input2',
      label: 'input2label',
    }],
    children: [{
      cond: {
        type: 'and',
        conds: [{
            type: 'truthy',
            field_id: 'input1',
        }, {
            type: 'not_empty',
            field_id: 'input2',
        }],
      },
      fields: [{
          type: 'boolean',
          id: 'input3',
          label: 'input3label',
      }, {
          type: 'string',
          id: 'input4',
          label: 'input4label',
      }],
    }],
}

export const exampleSchemaLabelAsKeys = {
    cond: {
      type: 'equals',
      field_id: 'showForm',
      field_value: true,
    },
    fields: [{
      type: 'boolean',
      label: 'input1label',
    }, {
      type: 'string',
      label: 'input2label',
    }],
    children: [{
      cond: {
        type: 'and',
        conds: [{
            type: 'truthy',
            field_id: 'input1label',
        }, {
            type: 'not_empty',
            field_id: 'input2label',
        }],
      },
      fields: [{
          type: 'boolean',
          label: 'input3label',
      }, {
          type: 'string',
          label: 'input4label',
      }],
    }],
}
