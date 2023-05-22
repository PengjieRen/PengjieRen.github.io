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
        if(paper.underReview===true)
        {
            return
        }
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

    // let sortedList = data.sort(compareSci)
    // $.getJSON('sci.json', (data) => {
    //     for (let i in data) {
    //         for (let j in sortedList) {
    //             if (data[i].link && sortedList[j].link && data[i].link === sortedList[j].link) {
    //                 sortedList[j].fileName = data[i].fileName
    //             }
    //         }
    //     }
    //
    //     $.getJSON('ei.json', (data) => {
    //         for (let i in data) {
    //             for (let j in sortedList) {
    //                 if (data[i].link && sortedList[j].link && data[i].link === sortedList[j].link) {
    //                     sortedList[j].fileName = data[i].fileName
    //                 }
    //             }
    //         }
    //
    //         console.log(JSON.stringify(sortedList))
    //     })
    // })

    // let firstCount = 0
    // let coFirstCount = 0
    // let starCount = 0
    // let coStarCount = 0
    // let aLevelCount = 0
    // let sciList = []
    // let eiList = []
    // let cpciList = []
    // let otherList = []
    // for (let i in sortedList) {
    //     let paperItem = sortedList[i]
    //     if (paperItem.authorIndex === 1)
    //         firstCount++
    //     if (paperItem.coFirst)
    //         coFirstCount++
    //     if (paperItem.star)
    //         starCount++
    //     if (paperItem.coStar)
    //         coStarCount++
    //     if (paperItem.levelIndex === 1)
    //         aLevelCount++
    //     if (paperItem.workshop)
    //         continue
    //     if (paperItem.sci)
    //         sciList.push(paperItem)
    //     else if (paperItem.ei)
    //         eiList.push(paperItem)
    //     else if (paperItem.cpci)
    //         cpciList.push(paperItem)
    //     else if (paperItem.link)
    //         otherList.push(paperItem)
    // }

    // sciList=sciList.sort(comparePaper)
    // console.log('sciList', JSON.stringify(sciList))

    // eiList = eiList.sort(comparePaper)
    // console.log('eiList', JSON.stringify(eiList))

    // otherList = otherList.sort(comparePaper)
    // console.log('otherList', JSON.stringify(otherList))

    // $.getJSON('otherList.json', (data) => {
    //     for (let i in data) {
    //         let item = data[i]
    //         let order = (i * 1) + 1
    //         item.fileName = 'other-' + order + '.pdf'
    //     }
    //     console.log(JSON.stringify(data))
    // })

    // formatPapers(sortedList)


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
        if (paper.coStar)
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

// 返回值paper1在前：-1，paper2在前1，相等0，SCI的优先排
function compareSci(paper1, paper2) {
    //SCI一作（1），SCI共一（1.5），SCI通讯（2），SCI共同通讯（2.5）
    // CCF A一作（3），CCF A共一（3.5），CCF A通讯（4），CCF A共同通讯（4.5）
    // SCI普通作者（5）
    // CCF B一作（6），CCF B共一（6.5），CCF B通讯（7），CCF B共同通讯（7.5）
    // 其他（8）
    let scorePaperBySCIOrALevel = (paper) => {
        // sci 一作、通讯
        if (paper.sci && paper.authorIndex == 1 && !paper.coFirst)
            return 1
        if (paper.sci && paper.coFirst)
            return 1.5
        if (paper.sci && paper.star && !paper.coStar)
            return 2
        if (paper.sci && paper.coStar)
            return 2.5

        // ccf a 一作、通讯
        if (paper.levelIndex == 1 && paper.authorIndex == 1 && !paper.coFirst)
            return 3
        if (paper.levelIndex == 1 && paper.coFirst)
            return 3.5
        if (paper.levelIndex == 1 && paper.star && !paper.coStar)
            return 4
        if (paper.levelIndex == 1 && paper.coStar)
            return 4.5

        // sci普通
        if (paper.sci)
            return 5

        // ccf b
        if (paper.levelIndex == 2 && paper.authorIndex == 1 && !paper.coFirst)
            return 6
        if (paper.levelIndex == 2 && paper.coFirst)
            return 6.5
        if (paper.levelIndex == 2 && paper.star && !paper.coStar)
            return 7
        if (paper.levelIndex == 2 && paper.coStar)
            return 7.5

        return 8
    }
    let paper1Score = scorePaperBySCIOrALevel(paper1)
    let paper2Score = scorePaperBySCIOrALevel(paper2)

    if (paper1Score != paper2Score)
        return paper1Score - paper2Score
    else
        return comparePaper(paper1, paper2)
}
