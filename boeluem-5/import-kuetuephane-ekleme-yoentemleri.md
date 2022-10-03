# Import (Kütüphane Ekleme) Yöntemleri

Bu yazıda sizlere Golang’ta paket import etmenin tüm yöntemlerini göstereceğim.\
**1. Yöntem**

```go
import "fmt"
```

**fmt** paketini import ettik.\
**2. Yöntem**

```go
import (
    "fmt"
    "net/http"
)
```

Birden fazla paket import ettik\
**3. Yöntem**

```go
import f "fmt"
```

**fmt** paketini import edip **f** olarak kullanacağımızı belirttik. Örnek olarak **fmt.Println()** yazmak yerine **f.Println()** yazacağız.\
**4. Yöntem**

```go
import . "fmt"
```

Dikkat ederseniz, **import** kelimesinden sonra **nokta** koyduk. Bu işlem sayesinde **fmt.Println()** yazmak yerine sadece **Println()** yazarak aynı işi yapmış oluruz.\
**5. Yöntem**

```go
import _ "fmt"
```

Bazen Golang yazarken kütüphaneyi ekleyip kullanmadığımız zamanlar olur. Böyle durumlarda program çalıştırılırken veya derlenirken kullandığınız editör veya ide bu bölümü silebilir. import ederken **\_ (alt tire)** koyarak bunun üstesinden gelebiliriz.
