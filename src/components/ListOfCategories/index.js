import React, { useEffect, useState, Fragment } from 'react'
import { Category } from '../Category'
import { List, Item } from './styles'

const useCategoriesDate = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    window
      .fetch('https://petgram-server.midudev.now.sh/categories')
      .then(res => res.json())
      .then(response => {
        setCategories(response)
        setLoading(false)
      })
    // return [categories, loading]
  }, [])

  return { categories, loading }
}

const ListOfCategoriesComponent = () => {
  const { categories, loading } = useCategoriesDate()
  const [showFixed, setShowFixed] = useState(false)

  /**
    Con el showFixed aquí este useEffect solo se ejecutará cuando este activo para mostrar.
  */
  useEffect(() => {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed && setShowFixed(newShowFixed)
    }

    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [showFixed])

  const renderList = fixed => {
    return (
      <List fixed={fixed}>
        {loading ? (
          <Item key='loading'>
            <Category />
          </Item>
        ) : (
          categories.map((category, index) => (
            <Item key={category.id}>
              <Category {...category} path={`/pet/${category.id}`} />
            </Item>
          ))
        )}
      </List>
    )
  }

  if (loading) {
    return <span>Cargando</span>
  }

  return (
    <Fragment>
      {renderList()}
      {showFixed && renderList(true)}
    </Fragment>
  )
}

export const ListOfCategories = React.memo(ListOfCategoriesComponent)