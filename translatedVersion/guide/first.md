# Welcome to flying elephant mark

**Mark flying elephant**It's a markdown editor specially designed for Evernote. It's realized through careful design and technology, combined with the powerful storage and synchronization function of Evernote, bringing unprecedented writing experience. Feature overview：
 
- **Rich in function** ：Support the upload of highlighted code block, * latex * formula, flow chart, local pictures and attachments, and even the paste of screenshots, so as to help with work and learning；
- **What the heart wishes one's hands accomplish** ：Simple and efficient editor, providing [desktop client] [1] and [offline chrome app] [2], supporting mobile web；
- **Deep integration** ：Support to select notebook and add label, support to jump from impression note to edit, easy to manage。

-------------------

[TOC]

## About markdon

> Markdown is a lightweight markup language that allows people to write documents in plain text format that is easy to read and write, and then convert them into rich HTML pages.    —— [Wikipedia](https://zh.wikipedia.org/wiki/Markdown)

As you are reading this document, it uses simple symbols to identify different titles, and marks some text as**bold**或者*Italics*，Create a[link](http://www.example.com)Or a footnote[^demo]。Here are some advanced functions. For more syntax, click`Ctrl + /`view help。 




### Code block
``` python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
```
### LaTeX formula

You can create inline formulas, such as $\ gamma (n) = (n-1)! \ Quad \ forall n \ in \ mathbb n $. Or block level formula:

$$	x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$

### form
| Item     |    Value |  Qty  |
| :------- | -------: | :---: |
| Computer | 1600 USD |   5   |
| Phone    |   12 USD |  12   |
| Pipe     |    1 USD |  234  |

### Flow chart
```flow
st=>start: Start
e=>end
op=>operation: My Operation
cond=>condition: Yes or No?

st->op->cond
cond(yes)->e
cond(no)->op
```

And sequence diagram:

```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

> **Tips：**Want to learn more，Please check.**Flow chart**[grammar][3]as well as**Sequence diagram**[grammar][4]。

### check box

Use `- [ ]` 和 `- [x]` Syntax can create check boxes to implement todo list and other functions. For example:
- [x] Completed items
- [ ] To do 1
- [ ] To do 2

> **Be careful：**At present, the support is not complete. It is invalid and cannot be synchronized to check the box in the impression notes, so you must**Mark flying elephant**The original markdown can only take effect. The next version will be fully supported。


## Impression notes related

### Notebook and label
**Mark flying elephant**Increased`@(Notebook)[Tag A|Tag B]`Syntax to select notebooks and add labels. **After account binding**，input`(`The list of notebooks will appear automatically. Please select from it.

### Note title
**Mark flying elephant**The first title that appears in the document is automatically used as the note title. For example, this article is on the first line `Welcome to flying elephant mark`。

### Quick editing
For the notes saved in the impression notes, there will be a red Edit button in the upper right corner. Click it to return to**Mark flying elephant**Open and edit the note in。
>**Be careful：**At present, mark Feixiang is unable to automatically perceive and update any changes made by users in the impression notes. So be sure to go back to mark Feixiang editor.

### Data synchronization
**Mark flying elephant**adopt**Save markdown text as hidden content in notes**The exquisite design of markdown realizes the storage and re editing of markdown. It not only solves the problem that other products only export HTML one-way, but also avoids the privacy security problem brought by server storage markdown. In this way, the server is only used for the call of impression notes API and data conversion.

 >**Privacy statement: all note data of users are saved in the impression notes. Mark Feixiang does not store any note data of the user.**

### offline storage
**Mark flying elephant**Use browser offline storage to save the content locally in real time, without worrying about network outage or browser crash. In order to save space and avoid conflicts, some local caches will be deleted for notes that have been synced to impression notes and are no longer modified, but they can still be passed at any time
`Document management`open。

> **Be careful:**Although browser storage is more reliable most of the time, as a professional cloud storage, impression notes are more trustworthy. Just in case,**Please be sure to sync to impression notes regularly and timely**。

## Editor related
### Set up
Right system menu (shortcut key`Ctrl + M`）Of`Set up`Set a，The interface font, font size, custom CSS, VIM / Emacs keyboard mode and other advanced options are provided.

### Shortcut keys

Help    `Ctrl + /`
Synchronous document   `Ctrl + S`
create documents    `Ctrl + Alt + N`
Maximize editor    `Ctrl + Enter`
preview files `Ctrl + Alt + Enter`
Document management   `Ctrl + O`
system menu    `Ctrl + M` 

Thickening    `Ctrl + B`
Insert picture    `Ctrl + G`
Insert link    `Ctrl + L`
Upgrade title  `Ctrl + H`

## About charges

**Mark flying elephant**Provide a 10 day trial period for new users. After the trial period, you need to[renew](maxiang.info/vip.html)To continue to use. New notes cannot be synced without purchase or renewal in time. Previously saved notes can still be edited.


## Feedback and suggestions
- Micro-blog:[@Mark flying elephant](http://weibo.com/u/2788354117)，[@GGock](http://weibo.com/ggock "Developer personal account")
- mailbox：<hustgock@gmail.com>

---------
Thank you for reading this help document. Please click the upper right corner to bind the impression Note account to open a new record and sharing experience。




[^demo]: This is an example footnote. Please refer to [Multimarkdown documentation](https://github.com/fletcher/MultiMarkdown/wiki/MultiMarkdown-Syntax-Guide#footnotes) Notes on footnotes。 **limit：** Use of note content in impression notes [ENML][5] format，HTML based, but some tags and attributes, such as ID, are not supported, which results in`footnote`和`TOC`Unable to click normally。


  [1]: http://maxiang.info/client_zh
  [2]: https://chrome.google.com/webstore/detail/kidnkfckhbdkfgbicccmdggmpgogehop
  [3]: http://adrai.github.io/flowchart.js/
  [4]: http://bramp.github.io/js-sequence-diagrams/
  [5]: https://dev.yinxiang.com/doc/articles/enml.php


