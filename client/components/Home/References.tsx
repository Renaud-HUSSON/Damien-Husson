import { IntersectionOptions, useInView } from 'react-intersection-observer'

export const References = () => {
  const options: IntersectionOptions = {
    threshold: 0.4,
    triggerOnce: true,
  }

  const artistiqueObserver = useInView(options)
  const musiqueObserver = useInView(options)
  const cinemaObserver = useInView(options)
  const literraireObserver = useInView(options)

  return (
    <>
      <div id='references'></div>
      <section className='home__references'>
        <h2>Mon Univers</h2>
        <div>
          <div
            ref={artistiqueObserver.ref}
            className={`home__references__item home__references__item__blue ${
              artistiqueObserver.inView ? 'home__references__item__visible' : ''
            }`}
          >
            <div className='home__reference__item__image'>
              <img
                src='/assets/ref_artistique.png'
                alt='Références Artistiques'
              />
            </div>
            <div className={`home__references__item__text`}>
              <h3>
                <span>
                  <span>01 |</span> Références Artistiques
                </span>
              </h3>
              <p>
                Après avoir découvert le graphisme, j'ai beaucoup regardé de
                vidéos pour apprendre et améliorer mes connaissances, 3 artistes
                m'ont particulièrement inspiré. <br /> <span>Gal Shir</span> est
                un Illustrateur, il est connu pour son style propre à lui et il
                montre ses réalisations en vidéo, Il m'a donné envie d'apprendre
                à dessiner avec ses créations captivantes. <br />{' '}
                <span>Balo</span> est un graphiste/typographe, il partage son
                travail en donnant des conseils pour évoluer dans le monde
                professionnel, c'est grâce à lui que je me suis intéressé à la
                typographie. <br /> <span>Basti</span> est un UX/UI designer, il
                parle de Design d'interface en donnant des astuces et les
                erreurs à ne pas faire. Je l'ai découvert en travailler sur un
                projet pour mes études et il m'a beaucoup aidé.
              </p>
            </div>
          </div>
          <div
            ref={musiqueObserver.ref}
            className={`home__references__item right home__references__item__pink ${
              musiqueObserver.inView ? 'home__references__item__visible' : ''
            }`}
          >
            <div className='home__reference__item__image'>
              <img src='/assets/ref_musique.png' alt='Références Musicales' />
            </div>
            <div className='home__references__item__text'>
              <h3>
                <span>
                  <span>02 |</span> Rérérences Musicales
                </span>
              </h3>
              <p>
                La musique m'accompagne tous les jours, que ce soit pendant mon
                travail ou mon temps libre, elle m'aide à me concentrer et à me
                relaxer. J'aime particulièrement la musique avec une structure
                musicale hypnotique, aérienne et ambiante comme le Cloud Rap ou
                le Lo-Fi. <br /> <span>PNL</span> est mon groupe français
                favori, des musiques planantes et des clips visuellement
                incroyables, ils sont les pionniers du Cloud Rap en France avec
                leur parcours presque parfait. <br /> <span>Travis Scott</span>{' '}
                est mon artiste américain préféré, il est connu pour son style
                musical qui est considéré comme un mélange entre du Rap et du
                Lo-Fi, des musiques et des clips psychédéliques et
                impressionnants. <br /> <span>Lofi Girl</span> est une chaine
                qui diffuse sans arrêt des morceaux de Lo-Fi, des musiques
                instrumentales, avec des rythmes lents et relaxants. J'écoute
                souvent cette chaine comme fond sonore pour travailler.
              </p>
            </div>
          </div>
          <div
            ref={cinemaObserver.ref}
            className={`home__references__item home__references__item__purple ${
              cinemaObserver.inView ? 'home__references__item__visible' : ''
            }`}
          >
            <div className='home__reference__item__image'>
              <img
                src='/assets/ref_series.png'
                alt='Références Cinématographiques'
              />
            </div>
            <div className='home__references__item__text'>
              <h3>
                <span>
                  <span>03 |</span> Références Cinématographiques
                </span>
              </h3>
              <p>
                J'aime beaucoup regarder des films, mais je suis surtout un très
                grand fan de séries. J'ai une grosse préférence pour les
                sitcoms, ce sont des séries humoristiques avec la plupart du
                temps des décors récurrents et des rires en fond. <br />{' '}
                <span>Friends, The Big Bang Theory</span> et{' '}
                <span>How I Met Your Mother </span>
                sont de loin mes 3 séries préférées, ce sont toutes les trois
                des sitcoms. Elles parlent chacune d'entre elles d'un groupe
                d'amis où l'on suit leurs histoires, les personnages sont tous
                très attachants et ont chacun une personnalité complètement
                différente. Les séries et les films en général m'ont beaucoup
                apporté, notamment un très bon niveau en anglais, une meilleure
                culture générale et le plus important une passion qui me rend
                heureux.
              </p>
            </div>
          </div>
          <div
            ref={literraireObserver.ref}
            className={`home__references__item right home__references__item__orange ${
              literraireObserver.inView ? 'home__references__item__visible' : ''
            }`}
          >
            <div className='home__reference__item__image'>
              <img src='/assets/ref_livre.png' alt='Références Littéraires' />
            </div>
            <div className='home__references__item__text'>
              <h3>
                <span>
                  <span>04 |</span> Références Littéraires
                </span>
              </h3>
              <p>
                Je ne suis pas quelqu'un qui lit énormément, je préfère d'autres
                formats comme la vidéo ou le podcast qui sont pour moi des
                alternatives plus intéressantes J'ai cependant quelques
                références littéraires qui m'ont permis d'améliorer ma culture
                artistique. <br /> <span>The History Of Graphic Design</span>,
                deux volumes qui regroupent les plus grands graphistes du monde,
                les créations les plus marquantes de chaque époque, mais surtout
                l'évolution du graphisme depuis 1960. <br />{' '}
                <span>Good Type : The Art Of Lettering</span>, un art book qui
                reprend les plus grands typographes du monde, plein de
                différents designs typographiques et l'évolution de la
                typographie dans le temps. <br /> <span> Designing Type</span>{' '}
                et <span>Morpho</span> sont les deux prochains livres que je
                prévois d'acheter. L'un explique comment créer une typographie,
                comprendre les caractères et la construction des lettres.
                L'autre répertorie toutes les différentes manières de dessiner
                le corps humain de façons artistiques.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
