$(document).ready(function () {
    /* ======= Scrollspy ======= */
    $('body').scrollspy({target: '#page-nav-wrapper', offset: 100});

    /* ======= ScrollTo ======= */
    $('.scrollto').on('click', function (e) {
        //store hash
        var target = this.hash;

        e.preventDefault();

        $('body').scrollTo(target, 800, {offset: -60, axis: 'y'});
    });

    /* ======= Fixed page nav when scrolled ======= */

    $(window).on('scroll resize load', function () {
        $('#page-nav-wrapper').removeClass('fixed');

        var scrollTop = $(this).scrollTop();
        var topDistance = $('#page-nav-wrapper').offset().top;

        if (topDistance > scrollTop) {
            $('#page-nav-wrapper').removeClass('fixed');
            $('body').removeClass('sticky-page-nav');
        } else {
            $('#page-nav-wrapper').addClass('fixed');
            $('body').addClass('sticky-page-nav');
        }
    });
});

var list1 = $('#list1');
var list2 = $('#list2');
var htmls = []
$.getJSON('papers.json', (data) => {
    data.forEach((paper, index) => {
        data[index].originIndex = index
        let html = ''
        paper.authors.forEach((author, authorIndex) => {
            let authorHtml = ''
            if (author.indexOf('*') >= 0) {
                authorHtml = author.replace('*', "") + '<em>*</em>'
            } else if (author.indexOf('#') >= 0) {
                authorHtml = author.replace('#', "") + '<em>#</em>'
            } else
                authorHtml = author

            if (author.indexOf('Pengjie Ren') >= 0) {
                if (author.indexOf('*') < 0 && paper.star) {
                    authorHtml = authorHtml + '<em>*</em>'
                }
                if (author.indexOf('#') < 0 && paper.coFirst) {
                    authorHtml = authorHtml + '<em>#</em>'
                }
                authorHtml = "<strong>" + authorHtml + "</strong>"
            }

            if (authorIndex === paper.authors.length - 2)
                html += authorHtml + ' and '
            else if (authorIndex === paper.authors.length - 1)
                html += authorHtml
            else
                html += authorHtml + ', '
        })
        html += '. '
        if (paper.link) {
            html += '<a target="_blank" href="' + paper.link + '">' + paper.title + '</a>'
        } else
            html += paper.title
        html += '. '
        html += paper.conference
        html += '. '
        if (paper.underReview)
            html += '(under review)'
        htmls.push(html)
    })

    for (var i in htmls) {
        if (i < 15) list1.append('<li>' + htmls[i] + '</li>');
        else list2.append('<li>' + htmls[i] + '</li>');
    }

    let sortedList = data.sort(comparePaper)
    formatPapers(sortedList)
})

function togglePublication(btn) {
    if (list2.css('display') == 'none') {
        list2.fadeIn();
        $(btn).html(
            '<i class="fa fa-chevron-circle-up"></i>&nbsp;Recent publications'
        );
    } else {
        list2.fadeOut();
        $('html, body').animate(
            {scrollTop: $('#publications-section').offset().top - 60},
            500
        );
        $(btn).html(
            '<i class="fa fa-chevron-circle-down"></i>&nbsp;Full publications'
        );
    }
}

function formatPapers(papers) {
    let formatted = ''
    for (let i in papers) {
        let paper = papers[i]
        let formattedText = paper.text
        formattedText = formattedText.replace(/\s+/g, ' ')// 替换为单个空格
        formattedText += '（CCF-' + paper.level + '）'
        // formattedText = formattedText.replaceAll('*,', '（通讯作者）,')

        if (paper.authorIndex === 1 && !paper.coFirst) {
            formattedText = formattedText.replaceAll('Pengjie Ren,', 'Pengjie Ren（独立一作）,')
        }
        if (paper.coFirst) {
            formattedText = formattedText.replaceAll('#,', '（共同一作）,')
        }
        if (paper.star && paper.coStar) {
            formattedText = formattedText.replaceAll('*,', '（共同通讯）,')
        }
        if (paper.star && !paper.coStar) {
            formattedText = formattedText.replaceAll('*,', '（独立通讯）,')
        }

        formatted += formattedText + '\r\n'
    }
    console.log(formatted)
}


//ab同级(1)，c低一级(2)，没有level等级最低(3)
function compareLevel(paper1, paper2) {
    let level1 = paper1.levelIndex === 1 || paper1.levelIndex === 2 ? 1 : (!paper1.levelIndex ? 3 : 2)
    let level2 = paper2.levelIndex === 1 || paper2.levelIndex === 2 ? 1 : (!paper2.levelIndex ? 3 : 2)
    return level1 - level2
}

//独立一作(1)和共同一作(2),通讯（3），共同通讯（4）,其他位次（5）
function compareAuthor(paper1, paper2) {
    let scorePaperByAuthorList = (paper) => {
        if (paper.authorIndex == 1 && !paper.coFirst)
            return 1
        if (paper.coFirst)
            return 2
        if (paper.star && !paper.coStar)
            return 3
        if (paper.star && paper.coStar)
            return 4
        return 5
    }
    let level1 = scorePaperByAuthorList(paper1)
    let level2 = scorePaperByAuthorList(paper2)
    return level1 - level2
}


// 返回值paper1在前：-1，paper2在前1，相等0
function comparePaper(paper1, paper2) {
    //比较ab、c
    let levelCompare = compareLevel(paper1, paper2)
    if (levelCompare != 0)
        return levelCompare

    //按作者比较
    let authorCompare = compareAuthor(paper1, paper2)
    if (authorCompare != 0)
        return authorCompare

    // 因为要近的往前排，所以加负号
    let yearCompare = -(paper1.year - paper2.year)
    if (yearCompare != 0)
        return yearCompare
    return paper1.levelIndex - paper2.levelIndex

}


function buildPaperData(text) {
    // console.log(text)
    let conferenceName2Level = {
        'AIJ': 'A',
        'TOIS': 'A',
        'ACL': 'A',
        'JASIST': 'B',
        'SIGIR': 'A',
        'WWW': 'A',
        'COLING': 'B',
        'Neurocomputing': 'C',
        'Natural Language Engineering': 'C',
        'CIKM': 'B',
        'ECAI': 'B',
        'AAAI': 'A',
        'TKDE': 'A',
        'Computer Networks': 'B',
        'EMNLP': 'B',
        'JCST': 'B',
        'ECIR': 'C',
        'Information Retrieval Journal': 'C',
        'APWeb': 'C',
        'Natural Language Processing and Chinese Computing': 'C'
    }
    let paper = {}
    paper.text = text
    let textList = paper.text.split('.')
    paper.authors = textList[0].split(',')
    paper.authors.forEach((author, index) => {
        paper.authors[index] = author.trim()
    })
    if (paper.authors[paper.authors.length - 1].startsWith("and")) {
        let originAuthor = paper.authors[paper.authors.length - 1]
        paper.authors[paper.authors.length - 1] = originAuthor.slice(3, originAuthor.length).trim()
    }
    if (paper.authors[paper.authors.length - 1].indexOf(" and ") >= 0) {
        let originAuthor = paper.authors[paper.authors.length - 1]
        let list = originAuthor.split(" and ")
        paper.authors[paper.authors.length - 1] = list[0]
        paper.authors.push(list[1])
    }

    paper.title = textList[1].trim()
    paper.conference = textList[2].trim()
    let authorIndex = paper.authors.findIndex((author) => {
        return author.indexOf('Pengjie Ren') >= 0
    })
    paper.authorIndex = authorIndex + 1
    paper.star = paper.authors[authorIndex].indexOf('*') >= 0
    paper.coStar = paper.star && text.split('*').length > 2
    paper.coFirst = paper.authors[authorIndex].indexOf('#') >= 0
    for (let i = 2013; i < 2022; i++) {
        if (textList[2].indexOf(i + '') >= 0) {
            paper.year = i + ''
            break
        }
    }
    for (let conferenceName in conferenceName2Level) {
        if (paper.text.indexOf(conferenceName) >= 0) {
            paper.level = conferenceName2Level[conferenceName]
            paper.levelIndex = paper.level === 'A' ? 1 : (paper.level === 'B' ? 2 : 3)
            break
        }
    }
    return paper
}

// parseList()
