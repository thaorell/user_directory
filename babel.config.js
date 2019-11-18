module.exports = {
    presets: [['@babel/preset-env', {
        "useBuiltIns": "entry"
      }],
     '@babel/preset-react'],
     "plugins": [
        ["@babel/plugin-transform-runtime",
          {
            "regenerator": true
          }
        ]
      ],
};