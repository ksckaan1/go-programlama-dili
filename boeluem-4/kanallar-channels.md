# Kanallar \(Channels\)

**Kanallar**, Go dilinde asenkron programlama yaparken değer aktarımı yapabileceğimiz hatlardır. Kanala değer atanması iş parçacığı tarafından bekleneceği için asenkron işlemler arasındaki senkronizasyonu ayarlayabiliriz. Kanallar `make()` fonksiyonu ile oluşturulur.

{% code title="Örnek" %}
```go
k := make(chan bool)
```
{% endcode %}

Yukarıdaki örnekte `make()` fonksiyonu ile `k` isminde bir kanal oluşturduk. Bu kanalın özelliği `bool` tipinde değer taşımasıdır. Yani bu kanal ile `true` veya `false` değerlerini taşıyabiliriz. Kanala değer göndermek için `<-` işaretini kullanırız. Yani bir nevi atama işlemi yapıyoruz. Atama işleminden farkı, kanala atama işlemi yapılana kadar iş parçacığının devam etmemesidir.

{% code title="Örnek Atama" %}
```go
k <- true
```
{% endcode %}

Atama işlemi ile kanalımıza değer yolladık. Bir de bu kanalın çıkış noktası olması gerekir. Bu çıkış noktasında, ister kanaldan gelen veriyi bir değişkene atayabiliriz, istersek de sadece kanala veri gelmesini bekleyebiliriz.

{% code title="Kanaldan gelen değeri değişkene atama" %}
```go
a := <-k
```
{% endcode %}

Yukarıdaki örnekte `a` isimli değişkene `k` kanalından gelen `bool` tipinde değer atadık. `a` değişkenine atama işlemi `k` kanalına değer gönderildiği zaman yapılacaktır. Yani `k` kanalına değer gelene kadar iş parçacığı duraklatılacaktır. _\(Program `k` kanalına gelecek değeri bekler.\)_

{% code title="Sadece kanala değer gelmesini beklemek" %}
```go
<- k
```
{% endcode %}

Yukarıdaki anlatılanlardan yola çıkarak bir örnek oluşturalım.

{% code title="Örnek kanal işlemleri" %}
```go
package main

import (
	"time"
)

func main() {

	//bir kanal oluşturalım
	k := make(chan bool)
	//bu kanalımız bool değer taşıyacak

	//asenkron bir iş parçacığı oluşturalım
	go func() {
		
		//bu iş parçacığı 5 sn beklesin
		time.Sleep(time.Second * 5)

		//k kanalına bool bir değer gönderelim
		k <- true
	}()

	//ana iş parçacığı k kanalına değer gelene kadar bekleyecek
	<-k
	//değer geldiğinde program sonlanacaktır.
}
```
{% endcode %}

## Boyutlu Kanal Oluşturma

Oluşturduğumuz kanala boyut vermek de mümkün. Yani kanalımıza birden fazla değer yollayabiliyoruz. Bunun için kanalı oluştururken `make()` fonksiyonunda boyutu da belirtelim.

{% code title="Örnek" %}
```go
package main

import (
	"fmt"
	"time"
)

func main() {

	//2 adet bool değer taşıyan bir kanal oluşturalım
	k := make(chan bool, 2)
	

	//asenkron bir iş parçacığı oluşturalım
	go func() {

		//5 sn beklesin
		time.Sleep(time.Second * 5)

		//k kanalına bool bir değer gönderelim
		k <- true

		//tekrardan 2 sn beklesin
		time.Sleep(time.Second * 2)

		//ve k kanalına 2. değer de gönderilsin.
		k <- false
	}()

	//ana iş parçacığı k kanalına 2 değer gelene kadar bekleyecek
	fmt.Println(<-k, <-k) //çıktı: true false
	//iki bool değeri de baştırmak için k kanalını 2 defa yazdık
}
```
{% endcode %}

Ana iş parçacığı _\(`main()` içerisine yazılan kodlar\)_ devam etmek için `k` kanalına gelen 2 değeri de bekleyecektir.

`fmt.Println()` içerisine sadece bir defa `<-k` yazsaydık, `k` kanalına ilk gelen değeri ekrana bastıracaktı.

