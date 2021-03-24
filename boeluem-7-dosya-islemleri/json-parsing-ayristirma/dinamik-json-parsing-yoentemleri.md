# Dinamik JSON Parsing Yöntemleri

Bazı durumlarda struct ile JSON parse etme uğraştırıcı olabiliyor. Özellikle json verisi olarak hangi tipte veri geleceğini bilmediğimiz durumlarda.

## Map ve Boş Interface Kullanarak

```go
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	//Öncelikle json düzeninde bir string oluşturalım
	futbolcuJson := `{
        "formaNo" : 10,
        "isim" : "Hakan Çalhanoğlu",
        "ülke" : "TR",
        "mevki" : "Orta Saha"
	}`

	// Map ve boş interface ile bir örnek oluşturalım
	var futbolcu map[string]interface{}

	//fulbolcuJson string ini futbolcu örneğini parse edelim
	json.Unmarshal([]byte(futbolcuJson), &futbolcu)

	//Oluşturduğumuz örneği bölümleri ile ekrana bastıralım
	fmt.Println("Forma No :", futbolcu["formaNo"],
		"\nİsim :", futbolcu["isim"],
		"\nÜlke :", futbolcu["ülke"],
		"\nMevki :", futbolcu["mevki"])
}
```

### Çıktımız

```go
Forma No : 10 
İsim : Hakan Çalhanoğlu 
Ülke : TR 
Mevki : Orta Saha
```

## Dizi Şeklinde Map ve Boş Interface Kullanarak

```go
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	//Bu sefer futbolcuları json içerisinde dizi
	//olarak tanımladık
	futbolcularJson := `[
		{
			"formaNo": 10,
			"isim": "Hakan Çalhanoğlu",
			"ülke": "TR",
			"mevki": "Orta Saha"
		},
		{
			"formaNo": 11,
			"isim": "Yusuf Yazıcı",
			"ülke": "TR",
			"mevki": "Forvet"
		},
		{
			"formaNo": 23,
			"isim": "Uğurcan Çakır",
			"ülke": "TR",
			"mevki": "Kaleci"
		}
	]`

	// Map'imizi boş interface ile dizi olarak oluşturalım
	var futbolcular []map[string]interface{}

	// Unmarshall işlemi
	json.Unmarshal([]byte(futbolcularJson), &futbolcular)

	//for döngüsü ile tüm futbolcuları ekrana bastıralım
	for index, futbolcu := range futbolcular {

		fmt.Printf("%d. sıradaki futbolcu:\n", index+1)
		fmt.Println("Forma No :", futbolcu["formaNo"],
			"- İsim :", futbolcu["isim"],
			"- Ülke :", futbolcu["ülke"],
			"- Mevki :", futbolcu["mevki"])
	}
}
```

### Çıktımız

```go
1. sıradaki futbolcu:
Forma No : 10 - İsim : Hakan Çalhanoğlu - Ülke : TR - Mevki : Orta Saha
2. sıradaki futbolcu:
Forma No : 11 - İsim : Yusuf Yazıcı - Ülke : TR - Mevki : Forvet
3. sıradaki futbolcu:
Forma No : 23 - İsim : Uğurcan Çakır - Ülke : TR - Mevki : Kaleci
```

## Map ve Boş String ile İç-içe JSON Verisi Okuma

```go
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	//İç içe bir Json verisi oluşturalım
	futbolcuJson := `{
		"formaNo": 10,
		"isim": "Hakan Çalhanoğlu",
		"ülke": "TR",
		"mevki": "Orta Saha",
		"istatistik": {
			"gol": 12,
			"asist": 7,
			"cezalı": false
		}
	}`

	// Örneğimizi oluşturalım
	var futbolcu map[string]interface{}

	// Parsing'i yapalım
	json.Unmarshal([]byte(futbolcuJson), &futbolcu)

	istatistik := futbolcu["istatistik"].(map[string]interface{})

	//Değerleri Anahtarlar ile okuyalım.
	fmt.Println("Forma No :", futbolcu["formaNo"],
		"\nİsim :", futbolcu["isim"],
		"\nÜlke :", futbolcu["ülke"],
		"\nMevki :", futbolcu["mevki"],
		"\nİstatistik : (Gol:", istatistik["gol"], "- Asist:", istatistik["asist"], "- Cezalı:", istatistik["cezalı"], ")")
}
```

### Çıktımız

```go
Forma No : 10 
İsim : Hakan Çalhanoğlu 
Ülke : TR 
Mevki : Orta Saha 
İstatistik : (Gol: 12 - Asist: 7 - Cezalı: false )
```

## Map ve Boş String ile İç-içe Dizi JSON Verisi Okuma

```go
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	//İç-içe veriler saklayan dizi Json verisi
	futbolcularJson := `[
		{
		"formaNo": 10,
		"isim": "Hakan Çalhanoğlu",
		"ülke": "TR",
		"mevki": "Orta Saha",
		"istatistik": {
			"gol": 12,
			"asist": 7,
			"cezalı": false
			}
		},
		{
		"formaNo": 11,
		"isim": "Yusuf Yazıcı",
		"ülke": "TR",
		"mevki": "Forvet",
		"istatistik": {
			"gol": 17,
			"asist": 9,
			"cezalı": true
			}
		},
		{
		"formaNo": 23,
		"isim": "Uğurcan Çakır",
		"ülke": "TR",
		"mevki": "Kaleci",
		"istatistik": {
			"gol": 0,
			"asist": 2,
			"cezalı": false
			}
		}
	]`

	// Futbolcu dizimizi tanımlayalım
	var futbolcular []map[string]interface{}

	// Unmarshall işlemi
	json.Unmarshal([]byte(futbolcularJson), &futbolcular)

	for index, futbolcu := range futbolcular {
		//futbolcuya özel istatistiklerimizi kullanmak için
		//map'imizi oluşturalım
		istatistik := futbolcu["istatistik"].(map[string]interface{})
		//Futbolcunun bilgilerini ekrana bastıralım
		fmt.Printf("%d. Futbolcu --------------------\n", index+1)
		fmt.Println("Forma No :", futbolcu["formaNo"],
			"\nİsim :", futbolcu["isim"],
			"\nÜlke :", futbolcu["ülke"],
			"\nMevki :", futbolcu["mevki"],
			"\nİstatistik : (Gol:", istatistik["gol"], "- Asist:", istatistik["asist"], "- Cezalı:", istatistik["cezalı"], ")")
	}

}
```

### Çıktımız

```go
1. Futbolcu --------------------
Forma No : 10 
İsim : Hakan Çalhanoğlu 
Ülke : TR 
Mevki : Orta Saha 
İstatistik : (Gol: 12 - Asist: 7 - Cezalı: false )
2. Futbolcu --------------------
Forma No : 11 
İsim : Yusuf Yazıcı 
Ülke : TR 
Mevki : Forvet 
İstatistik : (Gol: 17 - Asist: 9 - Cezalı: true )
3. Futbolcu --------------------
Forma No : 23 
İsim : Uğurcan Çakır 
Ülke : TR 
Mevki : Kaleci 
İstatistik : (Gol: 0 - Asist: 2 - Cezalı: false )
```

