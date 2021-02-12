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
              src={`/assets/artwork/${index + 1}.png`}
            />
          </figure>
        ))
      }
    </div>
  )
}

export async function getStaticProps() {
  const list = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
    .then(res => res.json())
    .then(({ results }) => results)
    .catch(e => { throw new Error(e.message || e) })

  return {
    props: { list },
  }
}
