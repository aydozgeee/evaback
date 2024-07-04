module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true, // Node.js için env ayarı ekleyin
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended', // Prettier eklentisini buraya ekleyin
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
}
