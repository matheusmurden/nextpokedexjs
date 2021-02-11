import Head from 'next/head'

export default function NextPokedex({ list }) {
  return (
    <div>
      <Head>
        <title>NextPokédex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        list.map(({ id, name, height, artwork }) => (
          <figure style={{ contentVisibility: 'auto', containIntrinsicSize: `${(height * 10) + 25}px` }} key={id}>
          <figcaption>
            {name}
          </figcaption>
          <img height={height * 10} loading="lazy" src={artwork} />
          </figure>
        ))
      }
    </div>
  )
}

export async function getStaticProps(context) {
  const list = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(res => res.json())
    .then(async({ results }) => await Promise.all(
      results.map(({ url }) => (
        fetch(url)
          .then(res => res.json())
          .then(({ id, name, height, sprites: { other: { 'official-artwork': { front_default } } }  }) => ({ id, name, height, artwork: front_default  }))
          .catch(e => console.log(e))
      ))
    ))
    .catch(e => console.log(e))

  return {
    props: { list }, // will be passed to the page component as props
  }
}