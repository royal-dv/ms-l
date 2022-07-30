export type { Ref } from 'vue'

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type Nulish<T> = T | null | undefined

export type MaybeArray<T> = T | T[]

export type ValueOf<T> = T[keyof T]

export type MaybeRef<T> = T | Ref<T>;
