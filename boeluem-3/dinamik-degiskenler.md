# Dinamik Değişkenler

Daha önceki bölümlerden de gördüğümüz üzere Go, dinamik atamayı desteklemiyor. Ama bunun elbette bir yöntemi var. Bunun için `interface`'den faydalanabiliriz.

Örnek:

```go
package main

import (
	"fmt"
)

//dinamik atama yapabilmek için önce boş bir interface oluşturalım
type dynamic interface{}

func main() {

	//x değişkenimizin tipini interface olarak belirleyelim
	var x dynamic

	//x'e integer tipinde değer atayalım
	x = 13

	//x'in tipini ve değerini ekrana bastıralım
	fmt.Printf("%T:%v\n", x, x) //int:13

	//Daha sonradan x'e string tipinde değer atayalım
	x = "selam"

	//x'in tipini ve değerini ekrana bastıralım.
	fmt.Printf("%T:%q\n", x, x) //string:"selam"
}
```

Yukarıdaki örnekte görüldüğü üzere `x` değişkenimize hangi tipte atama yaparsak, `x` değerin tipine dönüşüyor.

### Any

Go'ya gelen güncellemeden sonra `interface{}` yazmak yerine `any` yazarsanız aynı işlemi görür.

```go
var degisken any
```
