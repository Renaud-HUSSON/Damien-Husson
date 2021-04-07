export interface Realisation {
  id: number
  titre: string
  image: string
  description: string
  likes: number
  categorieId: number
  Category?: Categorie
  createdAt: string
  updatedAt: string
}

export interface Competence {
  id: number
  titre: string
  image: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Categorie {
  id: number
  nom: string
  createdAt: string
  updatedAt: string
}

export interface ShowRealisation {
  active: boolean
  realisationId: number | undefined
}

export interface SectionsRefs {
  presentation: LegacyRef<HTMLDivElement>
  references: LegacyRef<HTMLDivElement>
  competences: LegacyRef<HTMLDivElement>
  realisations: LegacyRef<HTMLDivElement>
  contact: LegacyRef<HTMLElement>
}
