FROM python:3.11

ENV POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true

ENV PATH="$POETRY_HOME/bin:$PATH"

WORKDIR /asceticism

RUN curl -sSL https://install.python-poetry.org | python3.11 -

COPY . .

RUN poetry install

