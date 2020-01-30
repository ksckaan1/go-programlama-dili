---
description: Twitter @YusihCano
---

# MongoDB

**MongoDB** 2009 yılında geliştirilmiş açık kaynak kodlu bir NoSQL veritabanıdır. Şimdi Go ile MongoDB veritabanını kullanmak için `mongo-driver` paketini indirelim.

> go get go.mongodb.org/mongo-driver/mongo

Kodu sürekli tekrardan yapıştırmamak için import edilecek tüm kütüphaneler burada :

```go
package main

import (
    "context"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)
```

Şimdi de `database` ile bağlantıyı sağlayalım. Eğer database adresini bilmiyorsanız mongo konsolunuzun nereye bağlandığına bakarak database adresini bulabilirsiniz.

```go
databaseURL := "mongodb://127.0.0.1:27017"
ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
client, err := mongo.Connect(ctx, options.Client().ApplyURI(databaseURL))
if err != nil {
    log.Fatal("Hata : " + err.Error())
}
kisiler := client.Database("test").Collection("kisiler")
```

Bu kısım `main` fonksiyonununun başlangıcı. Kısaca yapılan ise ilk satırda database adresini verdik. Ardından 10 saniye timeout'u olan bir context açtık. Context ve database adresini kullanarak bağlantımızı gerçekleştirdik.Son satırda da istedigimiz veritabanı ve collection'u çektik. Bundan sonra isim adında bir struct oluşturalım. Kişinin ismini ve yaşını tutsun.

```go
type Kisi struct {
    ID   primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
    Isim string             `bson:"isim,omitempty" json:"isim,omitempty"`
    Yas  int                `bson:"yas,omitempty"json:"yas,omitempty"`
}
```

Şimdi de bir kişi oluşturup database'e ekleyelim.

```go
birisi := Kisi{
    Isim: "Ahmet",
    Yas:  42,
}
res, err := kisiler.InsertOne(context.TODO(), birisi)
if err != nil {
    log.Fatal("Hata : " + err.Error())
}

id := res.InsertedID
fmt.Println(id)
```

Kişi oluşturma ve ekleme işlemlerinden sonra eklenen verinin id'sini de yazdırdık. MongoDB Compass ya da konsol üzerinden `db.kisiler.find()` yaparak eklenen veriyi görebiliriz. Şimdi de veri okuma yapalım. Tüm verileri almak için :

```go
ctx, _ = context.WithTimeout(context.Background(), 30*time.Second)
cur, err := kisiler.Find(ctx, bson.D{})
if err != nil {
    log.Fatal("Hata : " + err.Error())
}
defer cur.Close(ctx)
var list []Kisi
for cur.Next(ctx) {
    var result Kisi
    err := cur.Decode(&result)
    if err != nil {
        log.Fatal("Hata : " + err.Error())
    }
    list = append(list, result)
}
if err := cur.Err(); err != nil {
    log.Fatal("Hata : " + err.Error())
}
fmt.Println(list)
```

Şimdi de her hangi bir özelliğe göre arama yapalım.

```go
var result Kisi
ctx, _ = context.WithTimeout(context.Background(), 5*time.Second)
err = kisiler.FindOne(ctx, bson.M{"yas": 42}).Decode(&result)
if err != nil {
    log.Fatal("Hata : " + err.Error())
}
out, err := json.Marshal(&result)
if err != nil {
    log.Fatal("Hata : " + err.Error())
}
fmt.Println(string(out))
```

Silme işlemi yapalım.

```go
ctx, _ = context.WithTimeout(context.Background(), 5*time.Second) // Context for Delete
_, err = kisiler.DeleteOne(ctx, bson.D{{"yas", 39}})              // Delete User
if err != nil {
    log.Fatal("Hata : " + err.Error())
}
```

İsterseniz başka bir değer üzerinden de silme işlemi yapabilirsiniz. Ben direk istenen veriyi silmek için id kullanmanızı tavsiye ediyorum. Şimdi de Update ile temel fonksiyonları bitirelim.

```go
degisecek := Kisi{
    Isim: "Kemal",
    Yas:  39,
}
yeni := Kisi{
    Isim: "Kemal",
    Yas:  100,
}
var filtre bson.M
bytes, err := bson.Marshal(degisecek)
if err != nil {
    log.Fatal("Hata : " + err.Error())
}
bson.Unmarshal(bytes, &filtre)
var usr bson.M
bytes, err = bson.Marshal(yeni)
if err != nil {
    log.Fatal("Hata : " + err.Error())
}
bson.Unmarshal(bytes, &usr)
update := bson.D{
    {"$set", usr},
}
ctx, _ = context.WithTimeout(context.Background(), 5*time.Second)
_, err = kisiler.UpdateOne(ctx, filtre, update)
if err != nil {
    log.Fatal("Hata : " + err.Error())
}
```

