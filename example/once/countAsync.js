export const argv = (yargs) => yargs
  .default('n', 10)
  .usage('Usage: $0 -n [num]')
  .help('h')

export default async (argv) => {

  const {n} = argv

  console.log(`counting to ${n}`)

  for (let i = 1; i <= n; i++) {

    await sleep(1000)
    console.log(i)

  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}