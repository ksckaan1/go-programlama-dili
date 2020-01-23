# Yorum Satırı

Diğer dillerde de olduğu gibi Golang’ta yorum satırı özelliği mevcuttur. Yorum satırı derleyici tarafından işlenmez. Yani görmezden gelinir. Bu bölüme kendiniz için açıklama vs. bilgiler yazabilirsiniz. Golang’ta yorum satırı oluşturmak için 2 yöntem mevcuttur.

**// Çift Taksim Yöntemi**

Bu yöntem ile derlenmesini istemediğimiz yazının başına çift taksim ekleyerek görmezden gelinmesini sağlıyoruz.

```go
//Buraya herhangi birşey yazabilirsiniz
```

**/\* \*/ Taksim-Yıldız Yöntemi**

Bu yöntem ile birden fazla satırın derlemede görmezden gelinmesini sağlayabiliriz.

```go
/* Buraya
herhangi
birşey
yazabilirsiniz */
```

