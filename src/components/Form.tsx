import { useState, ChangeEvent, FormEvent, Dispatch } from 'react'
import { Activity } from '../types'
import { categories } from '../data/categories'
import { ActivityActions } from '../reducers/activity-reducer'

type FormProps = {
  dispatch: Dispatch<ActivityActions>
}

export default function Form({dispatch}: FormProps) {

  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: '',
    calories: 0
  })

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

    const isNumberField = ['category', 'calories'].includes(e.target.id)

    console.log(isNumberField)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: 'save-activity', payload: { newActivity: activity } })
  }

  return (
    <form
      className='space-y-5 bg-white p-10 rounded-lg shadow-md'
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className='font-bold'>Categoria:</label>
        <select
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          id='category'
          value={activity.category}
          onChange={handleOnChange}

        >
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className='font-bold'>Actividad:</label>
        <input
          type="text"
          id='name'
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          placeholder='Ejercicio, comida, etc'
          value={activity.name}
          onChange={handleOnChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className='font-bold'>Calorias:</label>
        <input
          type="number"
          id='calories'
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          placeholder='300, 500, etc'
          value={activity.calories}
          onChange={handleOnChange}
        />
      </div>

      <input
        type="submit"
        className='bg-gray-800 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer rounded disabled:opacity-10'
        value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
        disabled={!isValidActivity()}
      />

    </form>
  )
}
