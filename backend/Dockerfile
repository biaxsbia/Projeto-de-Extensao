FROM python:3.10-slim
WORKDIR /app

# Copiar o arquivo de requisitos
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta 5000 para o host
EXPOSE 5000

# Rodar o Flask com o comando correto para permitir acesso externo
CMD ["python", "app.py"]
