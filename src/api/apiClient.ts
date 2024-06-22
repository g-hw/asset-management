import axios, { AxiosError } from "axios"

export const cryptoApiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "Content-Type": "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API_KEY,
  },
})

// Add a request interceptor
cryptoApiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
cryptoApiClient.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response
  },
  (error: AxiosError) => {
    // Handle error response
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response error status:", error.response.status)
      console.error("Response error data:", error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request)
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Axios error:", error.message)
    }
    return Promise.reject(error)
  }
)

export const stockApiClient = axios.create({
  baseURL: "https://www.alphavantage.co/query",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
  },
})

// Add a request interceptor
stockApiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
stockApiClient.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response
  },
  (error: AxiosError) => {
    // Handle error response
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response error status:", error.response.status)
      console.error("Response error data:", error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request)
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Axios error:", error.message)
    }
    return Promise.reject(error)
  }
)
