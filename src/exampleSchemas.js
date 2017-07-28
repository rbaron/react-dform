
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
      type: 'date',
      id: 'dateinputid',
      label: 'dateinputlabel',
    }, {
      type: 'time',
      id: 'timeinputid',
      label: 'timeinputlabel',
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
      type: 'date',
      label: 'dateinputlabel',
    }, {
      type: 'time',
      label: 'timeinputlabel',
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

export const exampleLabelsGif = {
  cond: {
    type: 'always_true'
  },
  fields: [{
    type: 'boolean',
    label: 'Example boolean'
  }, {
    type: 'options',
    label: 'Example options',
    options: [{
      label: 'Option #1'
    }, {
      label: 'Option #2'
    }, {
      label: 'Option #3'
    }],
  }],
  children: [{
    cond: {
      type: 'and',
      conds: [{
        type: 'truthy',
        field_id: 'Example boolean'
      }, {
        type: 'equals',
        field_id: 'Example options',
        field_value: 'Option #2'
      }],
    },
    fields: [{
      type: 'string',
      label: 'Example string'
    }],
    children: [{
      cond: {
        type: 'equals',
        field_id: 'Example string',
        field_value: 'Expected value',
      },
      fields: [{
        type: 'date',
        label: 'Example date',
      }],
    }],
  }],
};
