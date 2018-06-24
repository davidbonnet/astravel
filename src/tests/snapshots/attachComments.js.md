# Snapshot report for `src/tests/attachComments.js`

The actual snapshot is saved in `attachComments.js.snap`.

Generated by [AVA](https://ava.li).

## Comments attachment

> Snapshot 1

    Node {
      body: [
        Node {
          comments: [
            {
              end: 70,
              loc: SourceLocation {
                end: Position {
                  column: 2,
                  line: 7,
                },
                start: Position {
                  column: 0,
                  line: 5,
                },
              },
              start: 29,
              type: 'Block',
              value: `␊
              Documentation for variable `point`.␊
              `,
            },
          ],
          declarations: [
            Node {
              end: 267,
              id: Node {
                end: 82,
                loc: SourceLocation {
                  end: Position {
                    column: 11,
                    line: 8,
                  },
                  start: Position {
                    column: 6,
                    line: 8,
                  },
                },
                name: 'point',
                start: 77,
                type: 'Identifier',
              },
              init: Node {
                comments: [
                  {
                    end: 146,
                    loc: SourceLocation {
                      end: Position {
                        column: 59,
                        line: 9,
                      },
                      start: Position {
                        column: 2,
                        line: 9,
                      },
                    },
                    start: 89,
                    type: 'Block',
                    value: ' This is a block comment inside an object expression ',
                  },
                ],
                end: 267,
                loc: SourceLocation {
                  end: Position {
                    column: 1,
                    line: 15,
                  },
                  start: Position {
                    column: 14,
                    line: 8,
                  },
                },
                properties: [
                  Node {
                    comments: [
                      {
                        end: 186,
                        loc: SourceLocation {
                          end: Position {
                            column: 39,
                            line: 10,
                          },
                          start: Position {
                            column: 2,
                            line: 10,
                          },
                        },
                        start: 149,
                        type: 'Line',
                        value: ' This comment is for the x property',
                      },
                    ],
                    computed: false,
                    end: 193,
                    key: Node {
                      end: 190,
                      loc: SourceLocation {
                        end: Position {
                          column: 3,
                          line: 11,
                        },
                        start: Position {
                          column: 2,
                          line: 11,
                        },
                      },
                      name: 'x',
                      start: 189,
                      type: 'Identifier',
                    },
                    kind: 'init',
                    loc: SourceLocation {
                      end: Position {
                        column: 6,
                        line: 11,
                      },
                      start: Position {
                        column: 2,
                        line: 11,
                      },
                    },
                    method: false,
                    shorthand: false,
                    start: 189,
                    type: 'Property',
                    value: Node {
                      end: 193,
                      loc: SourceLocation {
                        end: Position {
                          column: 6,
                          line: 11,
                        },
                        start: Position {
                          column: 5,
                          line: 11,
                        },
                      },
                      raw: '0',
                      start: 192,
                      type: 'Literal',
                      value: 0,
                    },
                  },
                  Node {
                    comments: [
                      {
                        end: 235,
                        loc: SourceLocation {
                          end: Position {
                            column: 40,
                            line: 12,
                          },
                          start: Position {
                            column: 2,
                            line: 12,
                          },
                        },
                        start: 197,
                        type: 'Line',
                        value: ' …and this one is for the y property',
                      },
                    ],
                    computed: false,
                    end: 242,
                    key: Node {
                      end: 239,
                      loc: SourceLocation {
                        end: Position {
                          column: 3,
                          line: 13,
                        },
                        start: Position {
                          column: 2,
                          line: 13,
                        },
                      },
                      name: 'y',
                      start: 238,
                      type: 'Identifier',
                    },
                    kind: 'init',
                    loc: SourceLocation {
                      end: Position {
                        column: 6,
                        line: 13,
                      },
                      start: Position {
                        column: 2,
                        line: 13,
                      },
                    },
                    method: false,
                    shorthand: false,
                    start: 238,
                    type: 'Property',
                    value: Node {
                      end: 242,
                      loc: SourceLocation {
                        end: Position {
                          column: 6,
                          line: 13,
                        },
                        start: Position {
                          column: 5,
                          line: 13,
                        },
                      },
                      raw: '1',
                      start: 241,
                      type: 'Literal',
                      value: 1,
                    },
                  },
                ],
                start: 85,
                trailingComments: [
                  {
                    end: 265,
                    loc: SourceLocation {
                      end: Position {
                        column: 21,
                        line: 14,
                      },
                      start: Position {
                        column: 2,
                        line: 14,
                      },
                    },
                    start: 246,
                    type: 'Line',
                    value: ' Trailing comment',
                  },
                ],
                type: 'ObjectExpression',
              },
              loc: SourceLocation {
                end: Position {
                  column: 1,
                  line: 15,
                },
                start: Position {
                  column: 6,
                  line: 8,
                },
              },
              start: 77,
              type: 'VariableDeclarator',
            },
          ],
          end: 267,
          kind: 'const',
          loc: SourceLocation {
            end: Position {
              column: 1,
              line: 15,
            },
            start: Position {
              column: 0,
              line: 8,
            },
          },
          start: 71,
          type: 'VariableDeclaration',
        },
        Node {
          body: Node {
            body: [
              Node {
                computed: false,
                end: 402,
                key: Node {
                  end: 320,
                  loc: SourceLocation {
                    end: Position {
                      column: 3,
                      line: 22,
                    },
                    start: Position {
                      column: 2,
                      line: 22,
                    },
                  },
                  name: 'm',
                  start: 319,
                  type: 'Identifier',
                },
                kind: 'method',
                loc: SourceLocation {
                  end: Position {
                    column: 3,
                    line: 26,
                  },
                  start: Position {
                    column: 2,
                    line: 22,
                  },
                },
                start: 319,
                static: false,
                type: 'MethodDefinition',
                value: Node {
                  async: false,
                  body: Node {
                    body: [],
                    comments: [
                      {
                        end: 398,
                        loc: SourceLocation {
                          end: Position {
                            column: 4,
                            line: 25,
                          },
                          start: Position {
                            column: 4,
                            line: 23,
                          },
                        },
                        start: 340,
                        type: 'Block',
                        value: `␊
                        		Document for method `m` with params `x` and `y`.␊
                        		`,
                      },
                    ],
                    end: 402,
                    loc: SourceLocation {
                      end: Position {
                        column: 3,
                        line: 26,
                      },
                      start: Position {
                        column: 17,
                        line: 22,
                      },
                    },
                    start: 334,
                    type: 'BlockStatement',
                  },
                  end: 402,
                  expression: false,
                  generator: false,
                  id: null,
                  loc: SourceLocation {
                    end: Position {
                      column: 3,
                      line: 26,
                    },
                    start: Position {
                      column: 3,
                      line: 22,
                    },
                  },
                  params: [
                    Node {
                      end: 322,
                      loc: SourceLocation {
                        end: Position {
                          column: 5,
                          line: 22,
                        },
                        start: Position {
                          column: 4,
                          line: 22,
                        },
                      },
                      name: 'x',
                      start: 321,
                      type: 'Identifier',
                    },
                    Node {
                      end: 332,
                      left: Node {
                        end: 325,
                        loc: SourceLocation {
                          end: Position {
                            column: 8,
                            line: 22,
                          },
                          start: Position {
                            column: 7,
                            line: 22,
                          },
                        },
                        name: 'y',
                        start: 324,
                        type: 'Identifier',
                      },
                      loc: SourceLocation {
                        end: Position {
                          column: 15,
                          line: 22,
                        },
                        start: Position {
                          column: 7,
                          line: 22,
                        },
                      },
                      right: Node {
                        end: 332,
                        loc: SourceLocation {
                          end: Position {
                            column: 15,
                            line: 22,
                          },
                          start: Position {
                            column: 11,
                            line: 22,
                          },
                        },
                        raw: 'true',
                        start: 328,
                        type: 'Literal',
                        value: true,
                      },
                      start: 324,
                      type: 'AssignmentPattern',
                    },
                  ],
                  start: 320,
                  type: 'FunctionExpression',
                },
              },
            ],
            comments: [
              {
                end: 315,
                loc: SourceLocation {
                  end: Position {
                    column: 3,
                    line: 20,
                  },
                  start: Position {
                    column: 2,
                    line: 18,
                  },
                },
                start: 281,
                type: 'Block',
                value: `␊
                	Documentation for class A.␊
                	`,
              },
            ],
            end: 404,
            loc: SourceLocation {
              end: Position {
                column: 1,
                line: 27,
              },
              start: Position {
                column: 8,
                line: 17,
              },
            },
            start: 277,
            type: 'ClassBody',
          },
          end: 404,
          id: Node {
            end: 276,
            loc: SourceLocation {
              end: Position {
                column: 7,
                line: 17,
              },
              start: Position {
                column: 6,
                line: 17,
              },
            },
            name: 'A',
            start: 275,
            type: 'Identifier',
          },
          loc: SourceLocation {
            end: Position {
              column: 1,
              line: 27,
            },
            start: Position {
              column: 0,
              line: 17,
            },
          },
          start: 269,
          superClass: null,
          type: 'ClassDeclaration',
        },
      ],
      comments: [
        {
          end: 27,
          loc: SourceLocation {
            end: Position {
              column: 2,
              line: 3,
            },
            start: Position {
              column: 0,
              line: 1,
            },
          },
          start: 0,
          type: 'Block',
          value: `␊
          Module documentation.␊
          `,
        },
      ],
      end: 405,
      loc: SourceLocation {
        end: Position {
          column: 0,
          line: 28,
        },
        start: Position {
          column: 0,
          line: 1,
        },
      },
      sourceType: 'script',
      start: 0,
      type: 'Program',
    }