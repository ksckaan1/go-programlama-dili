import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightImageZoom from 'starlight-image-zoom';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightLinksValidator(), starlightImageZoom()],
      title: 'Go Programlama Dili',
      logo: {
        src: './src/assets/golangtrlogo.png',
        replacesTitle: true,
        alt: 'Go Programlama Dili'
      },
      editLink: {
        baseUrl: 'https://github.com/ksckaan1/go-programlama-dili/edit/main/docs/'
      },
      description: 'Go Programlama Dili için Türkçe Eğitim Kaynağı',
      social: {
        github: 'https://github.com/ksckaan1/go-programlama-dili'
      },
      locales: {
        root: {
          dir: "ltr",
          lang: "tr",
          label: "Türkçe"
        }
      },
      expressiveCode: {
        plugins: [pluginLineNumbers()],
        defaultProps: {
          showLineNumbers: false
        }
      },
      sidebar: [
        {
          label: "Hakkında",
          collapsed: true,
          items: [
            {
              label: "Giriş",
              link: '/hakkinda/giris'
            },
            {
              label: "Katkıda Bulunanlar",
              link: '/hakkinda/katkida-bulunanlar'
            }
          ]
        }, {
          label: 'Ön Bilgi, Kurulum ve Yapılandırma',
          collapsed: true,
          items: [
            {
              label: 'Go Hakkında',
              link: '/on-bilgi-kurulum-ve-yapilandirma/go-hakkinda'
            },
            {
              label: 'Go Derleyicisi Kurulumu',
              link: '/on-bilgi-kurulum-ve-yapilandirma/gc-kurulumu'
            },
            {
              label: 'IDE Kurulumu ve Yapılandırmaları',
              link: '/on-bilgi-kurulum-ve-yapilandirma/ide-kurulumu-ve-yapilandirmalari'
            }
          ]
        }, {
          label: 'Proje Oluşturma, Derleme ve Çalıştırma',
          collapsed: true,
          items: [
            {
              label: 'Proje Oluşturma',
              link: '/proje-olusturma-derleme-ve-calistirma/proje-olusturma'
            },
            {
              label: 'Go Modules',
              link: '/proje-olusturma-derleme-ve-calistirma/go-modules'
            },
            {
              label: 'Derleme ve Yükleme',
              link: '/proje-olusturma-derleme-ve-calistirma/derleme-ve-yukleme'
            },
            {
              label: 'Paketler',
              link: '/proje-olusturma-derleme-ve-calistirma/paketler'
            },
            {
              label: 'Yorum Satırları',
              link: '/proje-olusturma-derleme-ve-calistirma/yorum-satirlari'
            }
          ]
        }, {
          label: 'Operatörler',
          collapsed: true,
          items: [
            {
              label: 'Aritmetik Operatörler',
              link: '/operatorler/aritmetik-operatorler'
            },
            {
              label: 'İlişkisel Operatörler',
              link: '/operatorler/iliskisel-operatorler'
            },
            {
              label: 'Mantıksal Operatörler',
              link: '/operatorler/mantiksal-operatorler'
            },
            {
              label: 'Atama Operatörleri',
              link: '/operatorler/atama-operatorleri'
            },
            {
              label: 'Bitsel Operatörler',
              link: '/operatorler/bitsel-operatorler'
            }
          ]
        }, {
          label: 'Veri Tipleri ve Tanımlamalar',
          collapsed: true,
          items: [
            {
              label: 'Veri Tipleri',
              link: 'veri-tipleri-ve-tanimlamalar/veri-tipleri'
            },
            {
              label: 'Veri Tiplerinin Tanımlanması',
              link: 'veri-tipleri-ve-tanimlamalar/veri-tiplerinin-tanimlanmasi'
            },
            {
              label: 'Tamsayı Veri Tipleri',
              link: 'veri-tipleri-ve-tanimlamalar/tamsayi-veri-tipleri'
            },
            {
              label: 'Ondalik Sayi Veri Tipleri',
              link: 'veri-tipleri-ve-tanimlamalar/ondalik-sayi-veri-tipleri'
            },
            {
              label: 'Karakter ve Dize Veri Tipleri',
              link: 'veri-tipleri-ve-tanimlamalar/karakter-ve-dize-veri-tipleri'
            },
            {
              label: 'Mantıksal Veri Tipleri',
              link: 'veri-tipleri-ve-tanimlamalar/mantiksal-veri-tipi'
            },
            {
              label: 'Karmaşık Sayı Veri Tipleri',
              link: 'veri-tipleri-ve-tanimlamalar/karmasik-sayi-veri-tipleri'
            },
            {
              label: 'Veri Tiplerinin İsimlendirilmesi',
              link: 'veri-tipleri-ve-tanimlamalar/veri-tiplerinin-isimlendirilmesi'
            }
          ]
        }, {
          label: 'Listeler',
          collapsed: true,
          items: [
            {
              label: 'Diziler',
              link: 'listeler/diziler'
            },
            {
              label: 'Dilimler',
              link: 'listeler/dilimler'
            }
          ]
        }, {
          label: 'Map (Eşleme)',
          link: '/map'
        }, {
          label: 'Döngüler',
          collapsed: true,
          items: [
            {
              label: 'For',
              link: 'donguler/for'
            },
            {
              label: 'For Range',
              link: 'donguler/for-range'
            }
          ]
        }, {
          label: 'Koşullu Yapılar',
          collapsed: true,
          items: [
            {
              label: 'If-Else',
              link: 'kosullu-yapilar/if-else'
            },
            {
              label: 'Switch',
              link: 'kosullu-yapilar/switch'
            }
          ]
        }, {
          label: 'Fonksiyonlar',
          collapsed: true,
          items: [
            {
              label: 'Fonksiyonlar',
              link: 'fonksiyonlar/'
            },
            {
              label: 'Variadic Fonksiyonlar',
              link: 'fonksiyonlar/variadic-fonksiyonlar'
            },
            {
              label: 'Closure Fonksiyonlar',
              link: 'fonksiyonlar/closure-fonksiyonlar'
            },
            {
              label: 'Recursive Fonksiyonlar',
              link: 'fonksiyonlar/recursive-fonksiyonlar'
            },
            {
              label: 'Anonim Fonksiyonlar',
              link: 'fonksiyonlar/anonim-fonksiyonlar'
            }
          ]
        }, {
          label: 'Veri Tipleri Arası İşlemler',
          collapsed: true,
          items: [
            {
              label: 'Type Casting',
              link: 'veri-tipleri-arasi-islemler/type-casting'
            },
            {
              label: 'Type Conversion',
              link: 'veri-tipleri-arasi-islemler/type-conversion'
            },
            {
              label: 'Type Assertion',
              link: 'veri-tipleri-arasi-islemler/type-assertion'
            }
          ]
        },
        {
          label: 'İşaretçiler',
          link: '/isaretciler'
        },
        {
          label: 'Metodlar',
          link: '/metodlar'
        },
        {
          label: 'Struct',
          collapsed: true,
          items: [
            {
              label: 'Struct',
              link: 'structlar/'
            },
            {
              label: 'Struct\'larda Erişim',
              link: 'structlar/structlarda-erisim'
            },
            {
              label: 'Struct Gömme',
              link: 'structlar/struct-gomme'
            },
            {
              label: 'Struct Etiketleri',
              link: 'structlar/struct-etiketleri'
            },
            {
              label: 'Alan Hizalama',
              link: 'structlar/alan-hizalama'
            }
          ]
        },
        {
          label: 'Arayüz (Interface)',
          link: '/arayuz'
        },
        {
          label: 'Eşzamanlılık ve Paralellik',
          collapsed: true,
          items: [
            {
              label: 'Go\'da Eşzamanlılık ve Paralellik',
              link: 'concurrency-and-parallelism/concurrency-and-parallelism'
            },
            {
              label: 'Goroutines',
              link: 'concurrency-and-parallelism/goroutines'
            }
          ]
        },
      ]
    })
  ],
});