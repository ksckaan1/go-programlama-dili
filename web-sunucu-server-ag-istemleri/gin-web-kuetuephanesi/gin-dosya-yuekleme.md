# Gin Dosya Yükleme

Bu yazıda Gin kütüphanesinden `POST` isteği ile nasıl dosya yükleyeceğimizi göreceğiz.

Aşağıda projemizin dizin/dosya yapısı bulunuyor.

```
.
├── main.go
└── public
    └── index.html
```

İlk olarak `index.html` dosyamızı görelim.

```markup
<!doctype html>
<html lang="tr">

<head>
    <meta charset="utf-8">
    <title>Dosya Yükle</title>
</head>

<body>
    <h1>Yüklemek için 1 adet dosya seçin</h1>

    <form action="/yukle" method="post" enctype="multipart/form-data">
        İsim: <input type="text" name="isim"><br>
        E-posta: <input type="email" name="email"><br>
        Dosya: <input type="file" name="dosya"><br><br>
        <input type="submit" value="Yükle">
    </form>
</body>
```

Detaylıca değinmiyorum. `input` elementlerinin `name` özelliğinde ne isim verdiğimizi dikkat etmemiz yeterli. `form` elementinin action özelliğine `/yukle` adresini verdik.

`main.go` dosyamız ise aşağıdaki gibi olacaktır. Detaylarına yorum satırlarında değindim.

```go
package main

import (
	"fmt"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	//Yükleme yapacağımız dosyanın maksimum boyutunu
	//ayarlayalım.
	router.MaxMultipartMemory = 8 << 20 // 8 MiB

	//index.html dosyamızın bulunduğu klasörü static olarak
	//ekliyoruz ki index.html dosyamızı kullanabilelim.
	router.Static("/", "./website")

	//yukleme işlemini yapacak olduğumuz yönlendirmeyi
	//buradan ayarlıyoruz.
	router.POST("/yukle", func(c *gin.Context) {

		//form içerisindeki dosya hariç verilerimizi
		//atayalım
		isim := c.PostForm("isim")
		eposta := c.PostForm("email")

		// Dosyamızı ise özel fonksiyon ile atıyoruz
		dosya, hata := c.FormFile("dosya")

		//Hata kontrolü yapmayı unutmayalım.
		if hata != nil {
			c.String(400, fmt.Sprintf("Form Hatası: %s", hata.Error()))
			return
		}

		//yüklenecek olan dosyanın ismini alalım.
		dosyaismi := filepath.Base(dosya.Filename)

		//yüklenen dosyanın kaydedileceği konum
		// dizin + dosyaismi
		kayıtYeri := "./website/" + dosyaismi

		//dosyayı kaydedelim ve hata kontrolü yapalım.
		if hata := c.SaveUploadedFile(dosya, kayıtYeri); hata != nil {
			c.String(400, fmt.Sprintf("Dosya Yükleme Hatası: %s", hata.Error()))
			return
		}

		//Şuana kadar herhangi bir sıkıntı ile
		//karşılaşmadıysak, olumlu mesajımızı gösterelim.
		c.String(200, fmt.Sprintf("%s isimli dosya başarıyla yüklendi \nİsim: %s\nE-posta: %s", dosya.Filename, isim, eposta))
	})
	router.Run(":8080")
}
```
