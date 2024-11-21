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

function Filter(meal) {
  return foodData.food.filter(item => Has(item, 'meal', translate[meal]) 
                                     && !Has(item, 'types', "type"))
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

function Equal(meta, id1, id2) {
  if (typeof id1 == typeof id2) {
    return id1 == id2
  }

  if (typeof id1 == "string") {
    return id1 == Lookup(meta, id2).name
  }
  
  if (typeof id2 == "string") {
    return id2 == Lookup(meta, id1).name
  }
}

function Resolve(base) {
  let included = [base]
  const dependency = getDependency(base)

  return included.concat(dependency.map(type => {
    const choice = foodData.food.filter(item => {
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
  const foods = Filter(meal)
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
          included.add(normalize(ing))
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

const included = new Set()

function normalize(str) {
  return str.normalize("NFD").toUpperCase();
  
}

function SearchFilter(search, target) {
  if (!search) {
    return false
  }
  
  if (!target.includes(search)) {
    return false
  }

  if (included.has(target)) {
    return false
  } 
  
  return true
}

function Search() {
  const input = document.getElementById('search-ing');
  const filter = normalize(input.value);
  const ul = document.getElementById('ing-list');

  let count = 1

  Array.from(ul.getElementsByTagName('li')).forEach( li => {
    const button = li.getElementsByTagName("button")[0];
    const txtValue = button.textContent || button.innerText;
    if (SearchFilter(filter, normalize(txtValue)) && count <= 5) {
      li.style.display = ""
      count += 1
    } else {
      li.style.display = "none"
    }
  })
  
  ul.style.visibility = "visible"
}
