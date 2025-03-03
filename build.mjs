import esbuild from 'esbuild'
import svelte from 'esbuild-svelte'
import { typescript } from 'svelte-preprocess-esbuild'

const dev = true

const main = async() => {
	const context = await esbuild.context({
		entryPoints: [ `./src/cool.mjs` ],
		bundle: true,
		outdir: `./dist`,
		globalName: `cool`,
		platform: `browser`,
		conditions: [ `svelte`, `browser`, `module` ],
		format: `iife`,
		resolveExtensions: [ `.ts`, `.js`, `.json`, `.mjs`, `.cjs` ],
		sourcemap: true,
		minify: !dev,
		external: [
			`*.gif`,
			`*.png`,
		],
		target: `es2022`, // browserslist_to_esbuild(`> .25% in US or last 2 years`),
		plugins: [
			svelte({
				// cache: false,
				compilerOptions: {
					// dev: true,
					// hydratable: false,
					css: `external`,
				},
				// filterWarnings: w => !exclude_svelte_warning_codes.has(w.code),
				preprocess: [
					typescript(),
				],
			}),
		],
	})

	const build = () => {
		console.time(`built in`)

		return context.rebuild()
			.then(() => console.timeEnd(`built in`))
			.catch(e => console.error(e))
	}

	await build()

	return context.dispose()
}

main().catch(e => {
	console.error(`ERROR in cf_workers/www/barnacle/esbuild.config.mjs`)
	console.error(e.message)
	process.exit(1)
})
