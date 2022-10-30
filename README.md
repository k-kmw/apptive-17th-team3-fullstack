# apptive-17th-team3-fullstack
team3's fullstack(Node JS + React.js + Next.js + NextAuth)
Without DB, Using Google Calendar API

# 논의사항
    - 프로젝트별 테마 색깔?
    - 한 프로젝트의 상세일정 받아오는게 있나?
    - api경로를 config파일 만들어서 거기서 쓸까 or baseURL을 따로 빼둘까(도메인 나중에 바뀜)
    - calendarID같은거 본인꺼 써야되는데..., 프런트는 api호출부 어떻게?
    - 일별 평균 작업 수....(일일 작업 수를 받아올 수 있으면, 앞뒤로 일주일치 불러와서...)
    - 혹시 figma말고 다른데서 디자인 있는거 있나?
    - 프로젝트 일정만 보여주기?
# API document
- 프로젝트
    1. list
        ```
        url : baseURL/api/....
        param : {}
        response : {
            status : 200,
            message : [{projectid, title, description}, ...]
        }
        backend_note : calendar.calendarlist.list, 프로젝트 일정만 가져오기?
        ```
    2. 프로젝트 내 일정들 받아오기
        ```
        url : baseURL/api/....
        param : {
            projectID
        }
        response : {
            status : 200,
            message : {
                percent....,
                lists : [{title, status, description, location, start, end}, ...]
            }
        }
        backend_note : calendar.events.list, calculate percent
        ```
    3. insert
        ```
        url : baseURL/api/....
        param : {
            title, description
            options : location
        }
        response : projectID
        backend_note : calendar.calendars.insert
        ```
    4. update
        ```
        url : baseURL/api/....
        param : {
            projectID
            options : location, title, description
            (바꾸고 싶은거만 보내주면 됩니다.)
        }
        response : {
            status : 200,
            message : "success"
        }
        backend_note : calendar.calendars.patch
        ```
    5. delete
        ```
        url : baseURL/api/....
        param : {
            projectID
        }
        response : {
            status : 200,
            message : ...
        }
        backend_note : calendar.calendars.delete
        ```

- 일정
    1. insert
        ```
        url : baseURL/api/....
        param : {
            title, start('2022-10-30T09:00:00-07:00'), end, projectID,
            options : location, description, (더 넣고싶은거 있으면 말해주세요)
        }
        response : {
            status : 200,
            message : eventID
        }
        backend_note : calendar.events.insert
        ```
    2. update
        ```
        url : baseURL/api/....
        param : {
            eventID, projectID,
            options : title, start, end, location, description, status
            (바꾸고 싶은거만 보내주면 됩니다.)
        }
        response : {
            status : 200,
            message : "success"
        }
        backend_note : calendar.events.patch
        ```
    2. delete
        ```
        url : baseURL/api/....
        param : {
            projectID, eventID
        }
        response : {
            status : 200,
            message : ...
        }
        backend_note : calendar.events.delete
        ```

- 당일 일정 받아오기(이게 제일 빡셀수도...?)
    - get
        ```
        ....우짠담
        ```