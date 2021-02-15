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
        list.map(({ id, name, icon, artwork, sounds }, index) => (
          <figure key={id}>
            <figcaption>{name}</figcaption>
            <Image
              width="40"
              height="40"
              loading="lazy"
              src={icon}
            />
            <audio controls preload="metadata">
              <source src={sounds.ogg} type="audio/ogg; codecs=vorbis"/>
              <source src={sounds.mp3} type="audio/mpeg"/>
            </audio>
          </figure>
        ))
      }
    </div>
  )
}

export async function getStaticProps() {
  const list = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
    .then(res => res.json())
    .then(({ results }) => results.map(
      ({ name, url }) => {
        const id = parseInt(url.split('/')[url.split('/').length - 2], 10)
        const type = id > 10000 ? 'alternate' : 'regular'
        return {
          name,
          id,
          icon: `/assets/icons/${type}/${id}.png`,
          artwork: `/assets/artwork/${type}/${id}.png`,
          sounds: {
            mp3: `/assets/sounds/mp3/${type}/${id}.mp3`,
            ogg: `/assets/sounds/ogg/${type}/${id}.ogg`
          }
        }
      }
    ))
    .catch(e => { throw new Error(e.message || e) })

  return {
    props: { list },
  }
}
