# Paketler

Her Golang programı paketlerden oluşur ve kendisi de bir pakettir.

```go
package uygulama

import "fmt"

func main() {
 fmt.Println("Merhaba Dünya") // Çıktımız
}
```

**package** terimi ile programımızın paket adını belirleriz. Hemen aşağısında da **import “fmt”** ile **fmt** paketini çektiğimizi görebilirsiniz. Yani çektiğimiz fmt paketi de bir programdır. Bilin bakalım fmt paketinin ilk satırında ne yazıyor? Tabiki de **package fmt**. Yani package ile programımızın ismini tanımlıyoruz. Bu ismi kullanarak diğer paketler ile iletişimde bulunabiliriz.

**import** terimi ise yazıldığı pakete başka bir paketten bir yetenek aktarmaya yarar. Yetenekten kastım, import edilen paketin içinde fonksiyonlar mı var? Struct’lar mı var? vs. onları içeri aktarır.

```go
import (
 “fmt”
 ”math”
)
```

Yukarıda birden fazla paket import etmeyi görüyoruz. **math** paketi bize ileri matematiksel işlemler yapabilmemiz için gerekli fonksiyonları sağlar.

