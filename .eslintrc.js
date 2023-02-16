/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const fs = require('fs')
const AutoImportESLintGlobals = require('unplugin-auto-import/eslint')

function parseAutoImportsDts(contents) {
    const matchResults = contents.matchAll(/^\s+const (\w+): typeof import/gm)
    return Array.from(matchResults, ([, word]) => word)
}

function uiPackageAutoImportGlobals() {
    const SRC = path.resolve(__dirname, './packages/ui/auto-imports.d.ts')

    const contents = fs.readFileSync(SRC, { encoding: 'utf-8' })
    const parsed = parseAutoImportsDts(contents)
    return parsed.reduce((acc, word) => {
        acc[word] = 'readonly'
        return acc
    }, {})
}

module.exports = {
    // ...
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        ...uiPackageAutoImportGlobals(),
        ...AutoImportESLintGlobals()
    }
}
