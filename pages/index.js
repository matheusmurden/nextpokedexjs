import Head from 'next/head'
import Image from 'next/image'

export default function NextPokedex({ list }) {
  return (
    <div>
      <Head>
        <title>NextPokédex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        list.map(({ name }, index) => (
          <figure key={index}>
            <figcaption>{name}</figcaption>
            <Image
              width="280"
              height="280"
              loading="lazy"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
            />
          </figure>
        ))
      }
    </div>
  )
}

export async function getStaticProps(context) {
  const list = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1013')
    .then(res => res.json())
    .then(({ results }) => results)
    .catch(e => { throw new Error(e.message || e) })

  return {
    props: { list }, // will be passed to the page component as props
  }
}