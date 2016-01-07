# API

### Version
0.0.1

meta - не нужная информация, пока не могу убрать
### Коллекции по темам

Формат ответа:
```json
{
	 [
		{
            description: "Только для студентов технических вузов"
            id: 2
            img_url: "http://media.cultserv.ru/library/original/1410165843974.jpg"
            name: "Коллекция для студентов технических вузов"
            theme_url: "http://188.166.36.174:3000/theme/12"
            collections: [{
                collection_url: "http://188.166.36.174:3000/collection/12"
                description: "Для студентов технических вузов"
                id: 1
                img_url: "https://pp.vk.me/c6061/v6061396/19858/ZJD4S1DNrus.jpg"
                name: "Гиперболоид инженера Гарина"
                themecollection: {definition: null, createdAt: "2016-01-07T04:30:01.706Z", updatedAt: "2016-01-07T04:30:01.706Z",…} //meta
                updated_at: "2016-01-07T04:30:01.706Z"
                created_at: "2016-01-07T04:30:01.706Z"
            }]
            created_at: "2016-01-07T04:30:01.706Z" //meta
            updated_at: "2016-01-07T04:30:01.706Z" //meta
		}
	]
}
```

### Конкретная тема
Формат ответа:
```json
{
	{
                description: "Только для студентов технических вузов"
                id: 2
                img_url: "http://media.cultserv.ru/library/original/1410165843974.jpg"
                name: "Коллекция для студентов технических вузов"
                theme_url: "http://188.166.36.174:3000/theme/12"
                collections: [{
                    collection_url: "http://188.166.36.174:3000/collection/12"
                    description: "Для студентов технических вузов"
                    id: 1
                    img_url: "https://pp.vk.me/c6061/v6061396/19858/ZJD4S1DNrus.jpg"
                    name: "Гиперболоид инженера Гарина"
                    themecollection: {definition: null, createdAt: "2016-01-07T04:30:01.706Z", updatedAt: "2016-01-07T04:30:01.706Z",…} //meta
                    updated_at: "2016-01-07T04:30:01.706Z"
                    created_at: "2016-01-07T04:30:01.706Z"
                }]
                created_at: "2016-01-07T04:30:01.706Z" //meta
                updated_at: "2016-01-07T04:30:01.706Z" //meta
    		}
}
```

`/api/themes/:id` возвращает конкретную запись темы

### Новые коллекции

Фотмат ответа:
```json
{
	[
		{
            collection_url: "http://188.166.36.174:3000/collection/12"
            description: "Для студентов технических вузов"
            events: [{
                actors_list: ""
                collectionevent: {definition: "простое описание ", createdAt: "2016-01-07T04:30:01.706Z",…} //meta
                description: ""
                directors_list: ""
                event_dates: [1453910400000]
                event_id: 502975 //по этому id можно найти конкретный event , например http://188.166.36.174:3000/api/events/502975
                event_img_url: "http://media.cultserv.ru/library/original/1410165843974.jpg"
                event_prices: ""
                genres_list: ""
                id: 1 //meta
                title: "Странная история доктора Джекила"
                updated_at: "2016-01-07T04:30:01.706Z" //meta
                created_at: "2016-01-07T04:30:01.706Z" //meta
                venue_id: 14 //по этому id можно искать театр, например http://188.166.36.174:3000/api/venues/14
            },…]
            id: 1
            img_url: "https://pp.vk.me/c6061/v6061396/19858/ZJD4S1DNrus.jpg"
            name: "Гиперболоид инженера Гарина"
            updated_at: "2016-01-07T04:30:01.706Z" //meta
            created_at: "2016-01-07T04:30:01.706Z" //meta
		}
	]
}
```

### Конкретная новая коллекция(aka Открытая коллекция)

Формат ответа:

```json
		{
            collection_url: "http://188.166.36.174:3000/collection/12"
            description: "Для студентов технических вузов"
            events: [{
                actors_list: ""
                collectionevent: {definition: "простое описание ", createdAt: "2016-01-07T04:30:01.706Z",…} //meta
                description: ""
                directors_list: ""
                event_dates: [1453910400000]
                event_id: 502975 //по этому id можно найти конкретный event , например http://188.166.36.174:3000/api/events/502975
                event_img_url: "http://media.cultserv.ru/library/original/1410165843974.jpg"
                event_prices: ""
                genres_list: ""
                id: 1 //meta
                title: "Странная история доктора Джекила"
                updated_at: "2016-01-07T04:30:01.706Z" //meta
                created_at: "2016-01-07T04:30:01.706Z" //meta
                venue_id: 14 //по этому id можно искать театр, например http://188.166.36.174:3000/api/venues/14
            },…]
            id: 1
            img_url: "https://pp.vk.me/c6061/v6061396/19858/ZJD4S1DNrus.jpg"
            name: "Гиперболоид инженера Гарина"
            updated_at: "2016-01-07T04:30:01.706Z" //meta
            created_at: "2016-01-07T04:30:01.706Z" //meta
		}
```

`/api/collections/:id` возвращает конкретную запись коллекции

## Открытая коллекция

Описание конкретного спектакля:
```json
{
	actors_list: ''
    description: ""
    directors_list: ""
    event_dates: [1452960000000, 1456070400000, 1457366400000]
    event_id: 497906
    event_img_url: "http://media.cultserv.ru/library/original/d64e024b7904d68cc326196b6664a54c96d3a768.jpg"
    event_prices: : {
         "stalls": 1000,
         "mezzanine": 2000,
         "balcony": 3000
    }
    genres_list: ""
    id: 3 //meta
    subevents: [,…] //meta
    title: "Вишневый сад"
    updated_at: "2016-01-07T04:30:01.771Z" //meta
    created_at: "2016-01-07T04:30:01.771Z" //meta
    venue_id: 173
    venues: [{
        address: ""
        created_at: "2016-01-07T04:30:01.416Z" //meta
        description: ""
        eventvenue: {definition: null, createdAt: "2016-01-07T04:35:16.928Z", updatedAt: "2016-01-07T04:35:16.928Z",…} //meta
        google_address: "55.768245, 37.607181"
        id: 9 //meta
        image_url: null
        region: null
        theatre_name: "Театр Ленком"
        updated_at: "2016-01-07T04:30:01.416Z" //meta
        venue_id: 173
    }]
}
```
`/api/events/:id`


Отправляем на сервер:(не сделал)
```json
{
		"collection_id": 12345,
		"purchase_events": [
			{
				"event_id": 1,
				"event_date": 1453910400000
			}
		],
		"purchase_key": "mezzanine",
		"clients_number": 2
}
```
