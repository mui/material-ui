# Browser benchmark

This project is used when running the following command:

```sh
yarn benchmark:browser
```

It is suppose to give developers comparable values between running different scenarios inside the browser, that can be find the `./scenarios` folder.

You should use these numbers exclusively for comparing performance between different scenarios, not as absolute values. There is also a `./noop` scenario, that renders nothing, to give you the idea of the initial setup time before the actual code is being run.

## Output

```
yarn benchmark:browser


noop (baseline):

12.20ms
12.99ms
15.31ms
12.06ms
12.93ms
12.50ms
12.07ms
12.81ms
12.01ms
11.85ms
-------------
Avg: 12.67ms
Median: 12.35ms

styled-components Box + @material-ui/system:

148.88ms
154.47ms
149.66ms
152.75ms
174.62ms
149.49ms
150.06ms
153.79ms
153.12ms
149.17ms
-------------
Avg: 153.60ms
Median: 151.41ms

styled-components Box + styled-system:

130.70ms
129.77ms
128.83ms
129.73ms
130.86ms
133.08ms
134.11ms
128.06ms
130.84ms
132.48ms
-------------
Avg: 130.85ms
Median: 130.77ms

Box emotion:

131.44ms
135.85ms
119.47ms
133.24ms
128.53ms
133.93ms
121.94ms
117.34ms
128.39ms
137.50ms
-------------
Avg: 128.76ms
Median: 129.99ms

Box @material-ui/styles:

137.14ms
126.32ms
128.90ms
140.05ms
135.97ms
127.30ms
128.47ms
124.21ms
138.90ms
142.17ms
-------------
Avg: 132.94ms
Median: 132.44ms

Box styled-components:

139.43ms
141.04ms
138.50ms
149.58ms
151.25ms
139.19ms
138.18ms
140.28ms
151.55ms
145.84ms
-------------
Avg: 143.48ms
Median: 140.66ms

Basic styled-components box:

101.34ms
108.33ms
107.84ms
128.64ms
129.10ms
120.34ms
114.48ms
113.67ms
133.23ms
133.86ms
-------------
Avg: 119.08ms
Median: 117.41ms
Done in 19.83s.
```
