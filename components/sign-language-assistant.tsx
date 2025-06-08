"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Camera, Mic, Send, Video, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SignLanguageAssistant() {
  const { toast } = useToast()
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Sign Language Assistant. I can help you with content creation, platform guidance, and answer questions about deaf culture and accessibility. How can I assist you today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputValue }])
    setInputValue("")

    // Simulate AI processing
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)

      // Add AI response
      const responses = [
        "I can help you with that! For creating engaging content for deaf audiences, focus on visual storytelling and clear signing. Make sure your videos have good lighting and a contrasting background for better visibility.",
        "Based on your analytics, your ASL tutorial videos are performing the best. Consider creating more educational content as it's resonating well with your audience.",
        "When working with brands, make sure to clarify accessibility requirements in your contracts. I can help you draft language to include in your agreements.",
        "For social media growth, consistency is key. I recommend posting 3-4 times per week and using relevant hashtags like #DeafCreator, #ASL, and #DeafCommunity.",
        "I've analyzed your recent videos and noticed your lighting could be improved. Consider using a ring light or positioning yourself facing a window for natural light.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])

      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      toast({
        title: "Recording stopped",
        description: "Processing your sign language input...",
      })

      // Simulate processing
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setMessages((prev) => [
          ...prev,
          { role: "user", content: "How can I improve my content for deaf audiences?" },
          {
            role: "assistant",
            content:
              "Based on your sign language question, I recommend focusing on clear visual communication. Ensure good lighting, use a contrasting background, and maintain a steady pace when signing. Also, consider adding captions for hard-of-hearing viewers who may not be fluent in sign language.",
          },
        ])

        // Scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }, 2000)
    } else {
      setIsRecording(true)
      toast({
        title: "Recording started",
        description: "I'm watching your sign language input...",
      })
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="mr-2 h-5 w-5" />
          AI Sign Language Assistant
        </CardTitle>
        <CardDescription>Your personalized assistant for content creation and platform guidance</CardDescription>
      </CardHeader>
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="chat">Text Chat</TabsTrigger>
          <TabsTrigger value="sign">Sign Language</TabsTrigger>
        </TabsList>

        <CardContent className="flex-1 flex flex-col p-0">
          <TabsContent value="chat" className="flex-1 flex flex-col mt-0 data-[state=active]:flex-1">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div className="flex items-start max-w-[80%] space-x-2">
                    {message.role === "assistant" && (
                      <Avatar>
                        <AvatarFallback>AI</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <Avatar>
                        <AvatarFallback>You</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex items-start max-w-[80%] space-x-2">
                    <Avatar>
                      <AvatarFallback>AI</AvatarFallback>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                        <div
                          className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isProcessing}
                />
                <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isProcessing}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
              <div className="flex justify-center mt-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Wand2 className="mr-1 h-3 w-3" />
                  Suggest content ideas
                </Button>
                <Button variant="outline" size="sm" className="text-xs ml-2">
                  <Wand2 className="mr-1 h-3 w-3" />
                  Analyze my latest video
                </Button>
                <Button variant="outline" size="sm" className="text-xs ml-2">
                  <Wand2 className="mr-1 h-3 w-3" />
                  Draft a caption
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sign" className="flex-1 flex flex-col mt-0 data-[state=active]:flex-1">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              {isRecording ? (
                <div className="relative w-full max-w-md aspect-video bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-16 w-16 text-muted-foreground animate-pulse" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-md aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-16 w-16 text-muted-foreground" />
                </div>
              )}

              <div className="mt-6 space-y-4 text-center">
                <Button size="lg" onClick={toggleRecording} variant={isRecording ? "destructive" : "default"}>
                  {isRecording ? (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Start Sign Language Input
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground">
                  {isRecording
                    ? "I'm watching your sign language input. Sign clearly and at a natural pace."
                    : "Click the button to start recording your sign language input. Make sure you're visible in the camera."}
                </p>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recent Sign Language Conversations</h3>
                <div className="space-y-2">
                  <div className="p-2 rounded-md bg-muted">
                    <p className="text-sm">
                      <span className="font-medium">You (signed):</span> How can I improve my content for deaf
                      audiences?
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">AI:</span> Focus on clear visual communication, good lighting, and
                      contrasting backgrounds.
                    </p>
                  </div>
                  <div className="p-2 rounded-md bg-muted">
                    <p className="text-sm">
                      <span className="font-medium">You (signed):</span> What are the best practices for ASL
                      storytelling?
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">AI:</span> Use expressive facial expressions, clear signing space,
                      and incorporate visual vernacular techniques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
