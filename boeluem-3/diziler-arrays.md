# Diziler \(Arrays\)

Diziler içlerinde bir veya birden fazla değer tutabilen birimlerdir. Bir dizideki her değer sırasıyla numaralandırılır. Numaralandırma sıfırdan başlar. Aynı şekilde örneğe geçelim.

```go
package main
import "fmt"
func main() {
 var a [3]string
 a[0] = "Ayşe" //Birinci değer
 a[1] = "Fatma" //İkinci değer
 a[2] = "Hayriye" //Üçüncü değer
 fmt.Println(a) //Çıktımız: [Ayşe Fatma Hayriye]
 fmt.Println(a[1])//Çıktımız: Fatma
}
```

Gelelim kodlarımızın açıklamasına. **a** isminde içerisinde 3 tane **string** tipinde değer barındırabilen bir dizi oluşturduk. a dizisinin birinci değerine yani **0** indeksine **“Ayşe”** atadık. 1 ve 2 indeksine ise “Fatma” ve “Hayriye” değerlerini atadık. a dizisini ekrana bastırdığımızda köşeli parantezler içinde dizinin içeriğini gördük. a’nın 1 indeksindeki değeri bastırdığımızda ise sadece 1 indeksindeki değeri gördük. Dizinin değerlerini tek tek olarak atayabileceğimiz gibi diziyi tanımlarken de değişkenlerini atayabiliriz.

```go
package main
import "fmt"
func main() {
 a := [3]string{"Ayşe", "Fatma", "Hayriye"}
 fmt.Println(a) //Çıktımız: [Ayşe Fatma Hayriye]
}
```

