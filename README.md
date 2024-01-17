# 🧣 Close-T 🧥
> ### Contributor: Chaejeong Hyun, Hany Song
> 🕰️ 2023.01.11 ~ 2024.01.17 <br />
*2023 Winter Madcamp Project* <br/>

## 🖥 Project Introduction
평상시에 옷 뭐 입지 고민하는 분들, 특별한 날에 차려입기 위해 옷장을 뒤지는 분들, 새로운 옷을 인터넷으로 주문할때 고민하는 모든 분들을 위한 간편한 모바일 앱 Close-T을 소개합니다. 자신의 옷장에 있는 사진들을 찍거나 주문 사이트의 옷 사진을 캡쳐하여 Close-T에 올리기만하면 간편하게 오늘 뭐 입을 지 AI를 통해 코디 스타일링 이미지를 받을수도 있고 스스로 코디를 해보면서 좋아하는 룩을 저장 해놓을수도 있습니다.

## ⚙️ Environment
<img src="https://img.shields.io/badge/Nest.js-339933?style=for-the-badge&logo=Nest.js&logoColor=white"/> ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white) ![Github](https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white) <img src="https://img.shields.io/badge/PostgreSQL-4479A1?style=for-the-badge&logo=PostgreSQL&logoColor=white"/> <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"/> ![Notion](https://img.shields.io/badge/Notion-808080?style=for-the-badge&logo=Notion&logoColor=white)

## Types

```tsx
export enum BodyType {
    Straight = '스트레이트',
    Wave = '웨이브',
    Natural = '내추럴',
    HourGlass = '모래시계형',
}
```

```tsx
export enum Styles {
    Casual = '캐주얼',
    Sporty = '스포티',
    Lovely = '러블리',
    Basic = '심플베이직',
    Chic = '모던시크',
    Romantic = '로맨틱럭셔리',
    Formal = '포멀/오피스룩',
    Natural = '꾸안꾸',
}
```

```tsx
export enum Category {
    Top = '상의',
    Bottom = '하의',
    Outer = '아우터',
    OnePiece = '원피스',
    Shoes = '신발',
    Bag = '가방',
}
```

```tsx
export enum Like {
    Like = 'like',
    None = 'none',
}
```

##

## API 명세서
## User 모듈

### 1. Get(’:userId/profile’): 유저 별 프로필 정보 보여주기

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/postsuser/:userId/profile |
| Request type | user_id: 유저 아이디 |
| Response type | JSON 형태: name, gender, email, profileImage |


### 2. Get(’:userId/check’): 기존 회원인지 체크

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/postsuser/:userId/check |
| Request type | mailto:user@example.comser_id: 유저 아이디 |
| Response type | string 형태 — “new user” 또는 “returning user” |

```jsx
Response:
- 이미 등록된 유저면 "returning user" 반환
- 처음 가입한 유저면 "new user" 반환
```

### 3. Post(’create’): 유저 가입하기

| 메서드 | 요청 URL |
| --- | --- |
| POST | http://{server_url}/api/postsuser/create |
| Request type | Body에 user 정보 다 기입 필요 |
| Response type | JSON 형태로 UserEntity를 보내준다 |

```tsx
Request body (JSON 형태로 이 정보들 다 기입 필요):
{
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    gender: string;

    @IsEmail()
    email: string;

    @IsString()
    profileImage: string;

    @IsNumber()
    @IsOptional()
    age?: number | null;

    @IsNumber()
    @IsOptional()
    height?: number | null;

    @IsEnum(BodyType)
    @IsOptional()
    bodyType?: BodyType | null;

    @IsArray()
    @IsEnum(Styles, { each: true })
    @IsOptional()
    styles?: Styles[] | null;
}
```

```tsx
Response body example:
{
    "user": {
        "id": "hchaejeong",
        "name": "Chaejeong Hyun",
        "profileImage": "kakao.jpg",
        "email": "hchaejung7@gmail.com",
        "gender": "Female",
        "age": 20,
        "height": 161,
        "bodyType": "내추럴",
        "styles": [
            "심플베이직",
            "꾸안꾸"
        ]
    }
}
```

### 4. Get(’:userId/detailNeeded’): 선택사항 기입 더 해야하는지 알려줌

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/postsuser/:userId/detailNeeded |
| Request type | userId 이름 (현재 로그인 된 유저 아이디) |
| Response type | result : string 형태 |

### 5. Patch(’:userId/add-information’): 선택사항 추가한거로 유저 프로필 업데이트

| 메서드 | 요청 URL |
| --- | --- |
| PATCH | http://{server_url}/api/postsuser/:userId/add-information |
| Request type | userId 이름 (현재 로그인 된 유저 아이디), @Body에 나이, 키, 체형 정보 입력 |
| Response type | result : userEntity |

## Clothes 모듈

### 1. Get(): 옷 종류별로 보여주기

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/posts:userId/clothes?category=___ |
| Request type | userId, category 이름 (Category 타입 중 하나를 Url에 넣기) |
| Response type | Status Code: 200 OK |

```jsx
Response body:
{
  "clothes": [
    {
      "id": "string",
      "category": "string",
      "styles": ["Styles"],
     	"like": "Like",
			"wish": "Wish",
			"trash": "Trash",
      "imageUrl": "string",
      "link": "string" | null,
      "user": "string",
      "userId": "string",
    },
    // ... more clothes objects
  ]
}
```

### DB 변경 후 대체된 메서드

### 2a. Get(’liked’): 좋아요 되어있는 옷들만 카테고리별 보여주기

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/posts:userId/clothes/liked?category=___ |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, category: 상의/하의… |
| Response type | Status Code: 200 OK |

### 2b. Get(’trashed’)

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/posts:userId/clothes/trashed?category=___ |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, category: 상의/하의… |
| Response type | Status Code: 200 OK |

### 2c. Get(’wished’)

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/posts:userId/clothes/wished?category=___ |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, category: 상의/하의… |
| Response type | Status Code: 200 OK |

### 3. Get(’:clothesId’): 선택한 옷 보여주기

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/posts:userId/clothes/:clothesId |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, clothesId: 선택된 옷 아이디 |
| Response type | Status Code: 200 OK |

```tsx
Response body:
{
  "selectedClothes":
    {
      "id": "string",
      "category": "string",
      "styles": ["Styles"],
      	"like": "Like",
				"wish": "Wish",
				"trash": "Trash",
      "imageUrl": "string",
      "link": "string" | null,
      "user": "string",
      "userId": "string",
    }
}
```

### 4. Patch(’:clothesId/changeLike’): 즐겨찾기 누르기

| 메서드 | 요청 URL |
| --- | --- |
| PATCH | http://{server_url}/api/posts:userId/clothes/:clothesId/changeLike |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, clothesId: 즐겨찾기 태그 바꾸고 싶은 옷 아이디 |
| Response type | Status Code: 200 OK |

### 5. Patch(’:clothesId/changeTrash’): 삭제 태그 누르기

| 메서드 | 요청 URL |
| --- | --- |
| PATCH | http://{server_url}/api/posts:userId/clothes/:clothesId/changeTrash |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, clothesId: 삭제 태그 바꾸고 싶은 옷 아이디 |
| Response type | Status Code: 200 OK |

### 6. Patch(’:clothesId/removeFromWish’): 위시에서 제거

| 메서드 | 요청 URL |
| --- | --- |
| PATCH | http://{server_url}/api/posts:userId/clothes/:clothesId/removeFromWish |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, clothesId: 즐겨찾기 태그 바꾸고 싶은 옷 아이디 |
| Response type | Status Code: 200 OK |

### 7. Delete(’:clothesId/remove’): 선택된 옷 삭제

| 메서드 | 요청 URL |
| --- | --- |
| DELETE | http://{server_url}/api/posts:userId/clothes/:clothesId/remove |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, clothesId: 삭제할 옷 아이디 |
| Response type | Status Code: 200 OK |

### 8. Post(’add’): 옷 하나 추가

| 메서드 | 요청 URL |
| --- | --- |
| POST | http://{server_url}/api/posts:userId/clothes/add |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, removebg API를 이용해 받아온 이미지와 여러 정보들로 옷 엔티티 생성 |
| Response type | JSON string |

## Codi 모듈

### 1. Get(): 모든 코디 다 보기

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/posts:userId/codi |
| Request type | userId: 현재 로그인 되어있는 유저 아이디 |
| Response type | Status Code: 200 OK |

```tsx
Response body:
{
	"codiIds": ["string"],
	"likes": ["Like"],
	"clothesImageUrls": [ ["string"], ["string"], ... ]
}
```

### 2. Post(’save’): 코디 저장 누른후 데이터베이스에 저장

| 메서드 | 요청 URL |
| --- | --- |
| POST | http://{server_url}/api/posts:userId/codi/save |
| Request type | userId: 현재 로그인 되어있는 유저 아이디,
Body에 코디 생성할시 필요한 정보들 필수 입력 - like, clothesIds, clothesImages, comment |
| Response type | Status Code: 200 OK, string으로 결과 보내주기 |

```tsx
Request body:
{
    @IsEnum(Styles, { each: true })
    @IsArray()
    styles: Styles[];

    @IsEnum(Like)
    @IsString()
    like: Like;

    @IsArray()
    @IsString({ each: true })
    clothesIds: string[];

    @IsString()
    @IsString({ each: true })
    clothesImages: string[];

    @IsString()
    @IsOptional()
    comment?: string;
}
```

```tsx
Response body: "codi has been saved"
```

### 3. Get(’:codiId/view’): 선택한 코디 상세정보 보기

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/posts:userId/codi/:codiId/view |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, codiId: 선택한 코디 아이디 |
| Response type | Status Code: 200 OK, JSON 형태 |

### 4. Patch(’:codiId/add/:clothesId’): 만들고 있는 코디에 옷 하나 추가

| 메서드 | 요청 URL |
| --- | --- |
| PATCH | http://{server_url}/api/posts:userId/codi/:codiId/add/:clothesId |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, codiId: 선택한 코디 아이디, clothesId: 추가할 옷 아이디 |
| Response type | Status Code: 200 OK, string 결과 |

### 5. Patch(’:codiId/comment’): 선택된 코디에 코멘트 작성/수정

| 메서드 | 요청 URL |
| --- | --- |
| PATCH | http://{server_url}/api/posts:userId/codi/:codiId/comment |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, codiId: 선택한 코디 아이디 |
| Response type | Status Code: 200 OK, string 결과 |

### 6. Patch(’:codiId/like’): 즐겨찾기 누르기

| 메서드 | 요청 URL |
| --- | --- |
| PATCH | http://{server_url}/api/posts:userId/codi/:codiId/like |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, codi: 즐겨찾기 태그 바꾸고 싶은 코디 아이디 |
| Response type | Status Code: 200 OK |

## OpenAI 모듈

### 1. Get(’generate-ootd’): DALLE 사용해서 오늘의 코디 생성

| 메서드 | 요청 URL |
| --- | --- |
| GET | http://{server_url}/api/posts:userId/openai/generate-ootd?stylePick=____ |
| Request type | userId: 현재 로그인 되어있는 유저 아이디, @ Query로 선택한 stylePick : Style |
| Response type | DALLE가 만들어준 이미지 |

## Prompt Engineering for OpenAI
~~~
For {gender} of age {age}, height {height} who has a {bodyType} body shape, generate today's OOTD for {stylePick} fashion style. The generated image should resemble a fashion magazine consisting of physical images of clothings from the closet. Do not include a figure of a person and instead only show one styling including one top, bottom, outer, shoes, and bag.
~~~
> Example prompt for generating OOTD image for a selected style through OpenAI Dall-E

## 🧑‍🤝‍🧑 Contributors
  <table border="" cellspacing="0" cellpadding="0" width="100%">
  <tr width="100%">
  <td align="center">Chaejeong Hyun</a></td>
  <td align="center">Hany Song</a></td>
  </tr>
  <tr>
</tr>
  <tr width="100%">
  <td  align="center"><a href="mailto:hchaejeong@kaist.ac.kr">hchaejeong@kaist.ac.kr</a></td>
  <td  align="center"><a href="mailto:hanis@kaist.ac.kr"></a>hanis@kaist.ac.kr</td>
     </tr>
      <tr width="100%">
       <td  align="center"><p>Backend NestJS APIs</p><p>Prompt Engineering for OpenAI</p><p>Postgresql Database Managing</p><p>LookBook and Gallery FrontEnd</p></td>
       <td  align="center"><p>Design</p><p>Closet and My Page FrontEnd</p></td>
     </tr>
  </table>
