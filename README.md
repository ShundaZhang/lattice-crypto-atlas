# Lattice Crypto Atlas · 格密码地图

面向软件与安全工程师的中文格密码学习网站。从二维格与基的直觉出发，经过 SVP / CVP / BDD、LLL / BKZ、LWE / SIS、模块格，走到 ML-KEM、ML-DSA 与安全实现。

公开站点：https://shundazhang.github.io/lattice-crypto-atlas/

纯静态 HTML、CSS、JavaScript；没有外部脚本或构建依赖。可在本目录运行 python3 -m http.server 8000，然后访问 http://localhost:8000/ 本地预览。

网站包含：

- index.html：八阶段学习路径与概念地图。
- learn.html：可在站内直接阅读的知识导读。
- lab.html：同格不同基、toy 噪声解码两个交互模型；通往六个纯 Python 示例。
- standards.html：NIST 正式标准、接口、工程审查点和资料库。

内容依据公开的 [lattice-based-cryptography-samples](https://github.com/ShundaZhang/lattice-based-cryptography-samples) 学习材料重新编写，并核对 [NIST PQC 标准化状态](https://csrc.nist.gov/Projects/Post-Quantum-Cryptography/Post_Quantum_Cryptography-Standardization)。示例与站内交互仅用于教学，不是生产密码实现。

内容核对：2026-09-24。标准状态和实现建议会变化，使用前请核对正式原文。
