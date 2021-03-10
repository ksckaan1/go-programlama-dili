# HTTP İstekleri \(Requests\)

Bu bölümde bir web sayfasına nasıl istekte bulunacağımızı göreceğiz.

## Get İsteği

Standart istektir.

```go
package main

import (
	"fmt"
	"io"
	"net/http"
)

func main() {
	//Google anasayfasına GET isteğinde bulunalım
	//ve dönen cevabı cevap değişkenine atayalım
	cevap, hata := http.Get("https://www.google.com.tr")
	if hata != nil {
		//Ya sev ya terket dedik ve paniği bastık.
		panic(hata)
	}
	//Body'i kapatmayı unutmayalım
	defer cevap.Body.Close()

	//Bu esnada Body'den cevabı çekip sayfa değişkenine alıyoruz.
	//Çünkü bunu yapmadan okunabilir bir sonuç alamayız.
	sayfa, hata := io.ReadAll(cevap.Body)

	if hata != nil {
		panic(hata)
	}

	//sayfa değişkeni byte dizisi tipinde olduğu için
	//string tipine cevirip okuyalım
	fmt.Println(string(sayfa))

	//Çıktımız Google TR anasayfasının kaynak kodları olacaktır.
}
```

### Sorgu Parametresi Ekleme

Örneğin, yaptığımız istekte `search?q=golang&hl=de` gibi bir sorgu kısmı olmasını istiyoruz. URL'yi girdiğimiz kısmı bunu el ile ekleyebiliriz tabiki. Ama onunda kolay bir yöntemi var. Bunun için `net/url` paketini içe aktaralım. Hemen görelim.

```go
func main() {
	params := url.Values{
		"q":  {"golang"}, //aranacak metin
		"hl": {"tr"}, //örnek olarak Türkçe sonuç vermesi için
	}
	fmt.Println("https://www.google.com.tr/search?" + params.Encode())
}
```

Çıktımız: `https://www.google.com.tr/search?q=golang&hl=tr`  
olacaktır.

Bu örneği de aşağıdaki gibi kullanabilirsiniz.

```go
package main
import (
	"fmt"
	"io"
	"net/http"
	"net/url"
)

func main() {
	params := url.Values{
		"q":  {"golang"},
		"hl": {"tr"},
	}

	//URL'imizi aşağıdaki gibi yazalım.
	cevap, hata := http.Get("https://www.google.com.tr/search?" + params.Encode())
	if hata != nil {
		panic(hata)
	}
	defer cevap.Body.Close()

	sayfa, hata := io.ReadAll(cevap.Body)

	if hata != nil {
		panic(hata)
	}

	fmt.Println(string(sayfa))

}
```

## Postform İsteği

```go
package main

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
)

func main() {
	//URL'e gönderilecek verileri oluşturalım.
	değerler := url.Values{
		"isim":    {"Kaan"},
		"soyisim": {"Kuşcu"},
	}

	//değerler.Encode() yapmadan direkt değerler şekline gönderiyoruz
	//çünkü göndereceğimiz bir url parametresi değildir.
	cevap, hata := http.PostForm("https://orneksite.com/kisiler", değerler)

	//Ya sev ya terket
	if hata != nil {
		panic(hata)
	}
	//Body'i kapatmayı unutmuyoruz.
	defer cevap.Body.Close()

	//Body'den gelen veriyi okuyoruz.
	sonuç, hata := io.ReadAll(cevap.Body)

	//Ya sev...
	if hata != nil {
		panic(hata)
	}

	//İnsanlar byte dizisini okuyamadığı için
	//string tipine çeviriyoruz.
	fmt.Println(string(sonuç))
}
```

## Post İsteği

Post isteğini yaparken örnek bir json verisi göndermeyi görelim.

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func main() {
	address := "https://orneksite.com/kisiler"
	hamVeri := map[string]string{
		"isim":    "Kaan",
		"soyisim": "Kuşcu",
	}
	jsonVeri, hata := json.Marshal(hamVeri)
	//jsonVeri string tipine çevirildiğinde:
	//{"isim":"Kaan","soyisim":"Kuşcu"}

	if hata != nil {
		panic(hata)
	}

	//Aşağıdaki gönderdiğimiz verinin json tipinde olduğunu bildiriyoruz.
	sorgu, hata := http.Post(address, "application/json", bytes.NewBuffer(jsonVeri))
	if hata != nil {
		panic(hata)
	}

	//sonucu sonuç değişkenine atayalım
	sonuç, hata := io.ReadAll(sorgu.Body)
	if hata != nil {
		panic(hata)
	}

	//Son olarak ekrana bastıralım.
	fmt.Println(string(sonuç))
}
```

Yukarıdaki örnekte json verimizi `map` ile oluşturarak `post` isteğinde kullandık. Map ile oluşturduğumuz json verisi esnek olmadığı için, yani yukarıdaki örnekte sadece `string` tipinde veri oluşturabildiğimiz için, bir de `struct` ile oluşturmayı görelim. Anonim bir struct oluşturup işimizi görebiliriz.

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func main() {
	address := "https://orneksite.com/kisiler"

	//struct içindeki değişken isimlerini büyük harfle
	//yazmazsak json'a çevirirken hata alırız.
	structVeri := struct {
		İsim    string `json:"isim"`    //json'da isim olacak
		Soyisim string `json:"soyisim"` //json'da soyisim olacak
		Yaş     int    `json:"yas"`     //json'da yas olacak
	}{"Kaan", "Kuşcu", 23}

	//struct'ımızı json'a çevirelim.
	jsonVeri, hata := json.Marshal(structVeri)
	//jsonVeri string tipine çevirildiğinde:
	//{"isim":"Kaan","soyisim":"Kuşcu","yas":23}

	if hata != nil {
		panic(hata)
	}

	//Aşağıdaki gönderdiğimiz verinin json tipinde olduğunu bildiriyoruz.
	sorgu, hata := http.Post(address, "application/json", bytes.NewBuffer(jsonVeri))
	if hata != nil {
		panic(hata)
	}

	//sonucu sonuç değişkenine atayalım
	sonuç, hata := io.ReadAll(sorgu.Body)
	if hata != nil {
		panic(hata)
	}

	//Son olarak ekrana bastıralım.
	fmt.Println(string(sonuç))
}
```

![](../.gitbook/assets/evync-5voaeostv.jpeg)

