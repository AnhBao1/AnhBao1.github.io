const result = document.getElementById('result')
const meals = [ "morning", "afternoon", "evening" ]

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

  result.innerHTML = ""

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
        console.log(ingrediences)
    for (const ing of ingrediences) {
      console.log(ing)
      if (Has(item, "ingrediences", ing)) {
        return false
      }
    }

    return true
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
  const food = FilterFood('', excluded)

  return included.concat(dependency.map(type => {
    const choice = food.filter(item => {
      return Has(item, "types", type.name || type )
    })
    return RanArr(choice)
  }))
}

function getDependency(food) {
  if (!food.hasOwnProperty("types")) {
    return []
  }
  
  return Concat(food.types.map(type => {
    const result = Lookup("type", type)
    if (!result || !result.depend) return []

    return result.depend.map(val => Lookup("type", val) || val)
  }))
}

function Menu(meal) {
  const foods = FilterFood(meal, excluded)
  const base = RanArr(foods)

  return Resolve(base)
  
}

function Populate() {
  const listed = new Set()
  const ul = document.getElementById('ing-list');
  ul.innerHTML = ""
  ul.style.display = "none"
  foodData.food.forEach(food => food.ingrediences?.forEach(
    ing => {
      if (!listed.has(ing)) {
        const li = document.createElement('li')
        const button = document.createElement('button')
        li.appendChild(button)
        button.innerText = ing
        button.onclick = () => {
          excluded.add(ing)
          Search()
        }
        ul.appendChild(li)
      }
      listed.add(ing)
    }
  ))
  Search()
  ul.style.display = ""
}

Populate()

const input = document.getElementById('search-ing').onkeyup = Search

const excluded = new Set()

function normalize(str) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toUpperCase();
  
}

function SearchFilter(search, target) {
  if (!search) {
    return false
  }
  
  if (!normalize(target).includes(normalize(search))) {
    return false
  }

  if (excluded.has(target)) {
    return false
  } 
  
  return true
}

function Search() {
  const input = document.getElementById('search-ing');
  const ul = document.getElementById('ing-list');

  let count = 1

  Array.from(ul.getElementsByTagName('li')).forEach( li => {
    const button = li.getElementsByTagName("button")[0];
    const txtValue = button.textContent || button.innerText;
    if (SearchFilter(input.value, txtValue) && count <= 5) {
      li.style.display = ""
      count += 1
    } else {
      li.style.display = "none"
    }
  })
  
  ul.style.visibility = "visible"
}
