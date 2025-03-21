FROM node:14 as learn-with-pely
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install --ignore-engines
COPY ./client .
RUN yarn build

# production
FROM nginx:stable-alpine as production
WORKDIR /app
RUN apk update && apk add --no-cache python3 && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -r /root/.cache
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
COPY --from=learn-with-pely /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./server/requirements.txt ./
RUN pip install -r requirements.txt
RUN pip install gunicorn
COPY ./server .
CMD gunicorn -b 0.0.0.0:5000 app:app --daemon && \
      sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && \
      nginx -g 'daemon off;'