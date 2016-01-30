# API

### Version
0.0.1

### Новые коллекции

Фотмат ответа:
```json
{
	"collections": [
		{
			"collection_id": "123"	
			"collection_name": "Название коллекции",
			"subscriptions": "13",
			"date": "12.12.12",
			"img_url": "http://example.com/img.png",
			"tags": ["tag1", "tag2"],
			"description": [
				{
					"name": "Василий Пупкин",
					"person_description": "студент",
					"text": "Описание крутое"
				}
			],
		}
	]
}
```

`http://kurtr.ru/api/collections?limit=5&offset=0`
limit и offset можно задавать любой

### Конкретная коллекция

Фотмат ответа:
```json
		{
			"collection_id": "123"	
			"collection_name": "Название коллекции",
			"subscriptions": "13",
			"date": "12.12.12",
			"img_url": "http://example.com/img.png",
			"tags": ["tag1", "tag2"],
			"events": [
				{
					"name": "Спектакль",
					"venue_name": "Большой",
					"venue_id": 12,
				}
			],
		}
```
`http://kurtr.ru/api/collections/:id`

## Открытая коллекция

Описание коллекции:
```json
{
		"collection_id": 12345,
		"name": "Название коллекции",
		"description": "Описание коллекции",
		"img_url": "http://example.com/img.png",
		"events": [
			{
					"event_id": 12345,
					"venue_name": "Название театра",
					"venue_id": 123,

					"img_url": "http://example.com/img.png",
					"name": "Название спектакля",
					"description": "Описание спектакля",

					"actors_list": ["Первое имя", "Второе имя", ],
					"genres_list": ["Первый жанр", "Второй жанр", ],
					"directors_list": ["Первый режиссер", "Второй режиссер", ],

					"event_dates": [1453910400000, 1452960000000],

					"event_prices": {
						"stalls": 1000,
						"mezzanine": 2000,
						"balcony": 3000
					}
			}
		]
}
```

`/api/collections/:id`

Описание конкретного спектакля:
```json
{
		"event_id": 12345,
		"venue_name": "Название театра",

		"img_url": "http://example.com/img.png",
		"name": "Название спектакля",
		"description": "Описание спектакля",

		"actors_list": ["Первое имя", "Второе имя", ],
		"genres_list": ["Первый жанр", "Второй жанр", ],
		"directors_list": ["Первый режиссер", "Второй режиссер", ],

		"event_dates": [1453910400000, 1452960000000],

		"event_prices": {
			"stalls": 1000,
			"mezzanine": 2000,
			"balcony": 3000
		}
}
```

`/api/events/:id`

Отправляем на сервер:
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
