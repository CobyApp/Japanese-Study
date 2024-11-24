FROM nginx:alpine

# 기본 nginx 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 사용자 정의 nginx 설정 추가
COPY nginx.conf /etc/nginx/conf.d

# 빌드된 파일을 nginx의 html 디렉토리로 복사
COPY build /usr/share/nginx/html

EXPOSE 1002 