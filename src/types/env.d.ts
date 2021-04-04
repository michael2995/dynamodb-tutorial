declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      DYNAMODB_ENDPOINT?: string
      AWS_REGION?: string
      MODE: "lambda-dev" | "lambda-prod" | "lambda-local" | "local"
    }
  }
}

export {}