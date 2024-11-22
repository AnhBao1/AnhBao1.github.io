const meals = [ "morning", "afternoon", "evening" ]
document.getElementById("no-result").style.display = "none"
const translate = {
  morning: "sáng",
  afternoon: "trưa",
  evening: "tối"
}

function Concat(arrays) {
  return [].concat.apply([], arrays)
}

function Has(obj, key, value) {
  if (!value) {
    return true
  }
  
  const target = obj[key]

  if (Array.isArray(target)) {
    return target.includes(value)
  }

  return target == value
}

function RanArr(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

document.getElementById("search").onclick = () => {
  let target = meals.filter(meal => document.getElementById(meal).checked)
  if (target.length == 0) {
    target = Object.keys(translate)
  }
  const food = Menu(RanArr(target))
  const result = document.getElementById("result")

  result.innerHTML = ""
  const no_result = document.getElementById("no-result")

  if (food.length == 0) {
    no_result.style.display = ""
  } else {
    no_result.style.display = "none"
  }

  food.forEach(item => {
    const li = document.createElement('li')
    li.innerText = item.name
    li.className = "food"
    result.appendChild(li)
  })
}

function FilterFood(meal, ingrediences) {
  return foodData.food.filter(item => {
    if (!Has(item, 'meal', translate[meal]) || Has(item, 'types', "type")) {
      return false
    }
    for (const ing of ingrediences) {
      if (Has(item, "ingrediences", ing)) {
        return true
      }
    }

    return false
  })
                               
}

function Lookup(meta, id) {
  const arr = foodData[meta] 
  if (Number.isInteger(id)) {
    if (arr[id].id == id) {
      return foodData[meta][id]
    }
    return arr.filter(item => item.id == id)[0] || null
  }

  if (typeof id == "string") {
    return arr.filter(item => item.name == id)[0] || null
  }

  return null
}

function Resolve(base) {
  let included = [base]
  const dependency = getDependency(base)
  const food = FilterFood('', ingrediences)

  return included.concat(dependency.map(type => {
    const choice = food.filter(item => {
      return Has(item, "types", type.name || type )
    })
    return RanArr(choice)
  })).filter(i => i)
}

function getDependency(food) {
  if (!food || !food.hasOwnProperty("types")) {
    return []
  }
  
  return Concat(food.types.map(type => {
    const result = Lookup("type", type)
    if (!result || !result.depend) return []

    return result.depend.map(val => Lookup("type", val) || val)
  }))
}

function Menu(meal) {
  const foods = FilterFood(meal, ingrediences)
  const base = RanArr(foods)

  return Resolve(base)
  
}

const ingrediences = new Set()

function Populate() {
  const listed = new Set()
  const div = document.getElementById('ing-list');
  div.innerHTML = ""
  foodData.food.forEach(food => food.ingrediences?.forEach(
    ing => {
      if (!listed.has(ing)) {
        const label = document.createElement('label')
        label.className = "food"
        label.textContent = ing
        const checkbox = document.createElement('input')
        checkbox.onclick = () => {
          if (checkbox.checked) {
            ingrediences.add(ing)
          } else {
            ingrediences.delete(ing)
          }
        }
        checkbox.type = "checkbox"
        label.appendChild(checkbox)
        
        div.appendChild(label)
      }
      listed.add(ing)
    }
  ))
  Search()
}

Populate()

function normalize(str) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toUpperCase();
  
}

function SearchFilter(search, target) {
  if (ingrediences.has(target)) {
    return false
  }

  if (!search) {
    return true
  }
  
  if (normalize(target).includes(normalize(search))) {
    return true
  }

  return false
}

function Search() {
  const ul = document.getElementById('ing-list');


}
