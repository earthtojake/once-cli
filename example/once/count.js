export default (argv) => {

  const {
    n = 10
  } = argv

  console.log(`counting to ${n}`)

  for (let i = 1; i <= n; i++) {

    console.log(i)

  }

}