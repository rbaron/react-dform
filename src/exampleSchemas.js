
export const exampleSchema = {
    cond: {
      type: 'always_true',
    },
    fields: [{
      type: 'boolean',
      id: 'input1',
      label: 'input1label',
    }, {
      type: 'string',
      id: 'input2',
      label: 'input2label',
    }, {
      type: 'options',
      id: 'inputoptid',
      label: 'inputoptlabel',
      options: [{
        id: 'optid1',
        label: 'optid1label',
      }, {
        id: 'optid2',
        label: 'optid2label',
      }, {
        id: 'optid3',
        label: 'optid3label',
      }],
    }],
    children: [{
      cond: {
        type: 'and',
        conds: [{
            type: 'truthy',
            field_id: 'input1',
        }, {
            type: 'truthy',
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
      type: 'always_true',
    },
    fields: [{
      type: 'boolean',
      label: 'input1label',
    }, {
      type: 'string',
      label: 'input2label',
    }, {
      type: 'options',
      label: 'inputoptlabel',
      options: [{
        label: 'optid1label',
      }, {
        label: 'optid2label',
      }, {
        label: 'optid3label',
      }],
    }],
    children: [{
      cond: {
        type: 'and',
        conds: [{
            type: 'truthy',
            field_id: 'input1label',
        }, {
            type: 'truthy',
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
