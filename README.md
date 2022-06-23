POS (android focus) template using firebase

Firebase structure
  Firestore
  collections: Menu, Order, History
    Menu
      doc.id = type + '\_' + id
      type list: Food1, Food2, FoodSet
      field list: name: string, price: string
        name: name of item
        price: price of item
    Order
      field list: date: number(may be change to Timestamp later), foods: map, isFinished: boolean, totalAmount: number
        date: timestamp of order
        foods: food list in order
        isFinished: is this order finished
        totalAmount: total amount of this order
    History (same as Order but History)
      field list: date: number(may be change to Timestamp later), foods: map, isFinished: boolean, totalAmount: number
        date: timestamp of order
        foods: food list in order
        isFinished: is this order finished
        totalAmount: total amount of this order

  Storage
  folders: Food1, Food2, FoodSet, Sign
    folder Food1, Food2, FoodSet images naming: type + '-' + id (.jpg)
    folder Sign images naming: sign name (replace ' ' with '\_') + '-' + sign (.svg)
    
Auth
  using in app custom auth (low security)
