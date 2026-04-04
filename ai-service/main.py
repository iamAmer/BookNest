from fastapi import FastAPI

app = FastAPI(title="BookNest AI Service")


@app.get("/health")
def health():
    return {"status": "ok"}
