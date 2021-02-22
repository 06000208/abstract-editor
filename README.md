# abstract-editor

An offline [web application](https://en.wikipedia.org/wiki/Web_application) for editing abstract data, with the goal of providing an intuitive graphical editor befitting that data, as well as features such as the ability to edit the raw text, search, tags, edit history, and so on.

Data stored via [JSON](https://en.wikipedia.org/wiki/JSON) will likely work best due to this being a web application, with [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) and [YAML](https://en.wikipedia.org/wiki/YAML) close behind. Similar file types will be likely see implementation as well.

Whether it can achieve all that is another matter, and presently, it's in a highly experimental initial development, with the [/demos/](/demos/) folder containing various mockups and demos.

By "data of any nature", I mean data like...

- Text with headers, document-esque
- Icons and website links (such as with bookmarks)
- A folder's worth of images
- Monthly transatlantic airtravel data
- Family photos
- A long JSON array of different communities with corresponding website urls, descriptions, and branding images
- A list of video games with accompanying links to their digital distribution websites
- Articles about specific topics
- Notes and todo lists
- Bookmarks
- References and citations
- None of the above

Abstract editor intends to accomplish it's goal for whatever your purpose and data by implementing a wide range of different displays and components. Such as a basic page, a table, a gallery, a [tree view](https://en.wikipedia.org/wiki/Tree_view), [kanban board](https://en.wikipedia.org/wiki/Kanban_board), and so on. Even something suitable for [tier lists](https://en.wikipedia.org/wiki/Tier_list).

It draws inspiration from many things, mainly:

- [Knowledge bases](https://en.wikipedia.org/wiki/Knowledge_base)
- [Wikis](https://en.wikipedia.org/wiki/Wiki)
- [Note-taking](https://en.wikipedia.org/wiki/Note-taking) software
- [Browser bookmarks](https://en.wikipedia.org/wiki/Bookmark_(digital))
- [Productivity software](https://en.wikipedia.org/wiki/Productivity_software)
- [Collaborative software](https://en.wikipedia.org/wiki/Collaborative_software)
- [Task management software](https://en.wikipedia.org/wiki/Task_management#Task_management_software)
- [Reference management software](https://en.wikipedia.org/wiki/Reference_management_software)
- [Password managers](https://en.wikipedia.org/wiki/Password_manager)
- [Tag editors](https://en.wikipedia.org/wiki/Tag_editor)

# Credits & Attributions

### Silk Icons

Some of mark james' wonderful [silk icons](http://www.famfamfam.com/lab/icons/silk/) are located in the `demos/initial/.editor/assets/silkicons` directory, and are used as examples of 16x16 icons. Full credit to mark james for their creation, and they can be obtained from famfamfam.com at the following page:

http://www.famfamfam.com/lab/icons/silk/

### IonIcons

This project makes use of the SVG vector images from [IonIcons](https://ionicons.com/), as well as customizing them to suit it's needs. They can be found under `demos/initial/.editor/assets/ionicons` and `.editor/assets/custom-ionicons` respectively, accompanied by [Ionic Team](https://github.com/ionic-team)'s MIT License.

https://ionicons.com/
